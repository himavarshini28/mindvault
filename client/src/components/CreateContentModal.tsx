import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import api from "../lib/api";
import axios from "axios";
import { useAuth } from "../store/useAuth";

const ContentType = {
  Youtube: "youtube",
  Twitter: "tweet",
  LinkedIn: "linkedin",
  Others: "others",
} as const;

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateContentModal({ open, onClose, onSuccess }: CreateContentModalProps) {
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<string>(ContentType.Others);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const content = contentRef.current?.value;

    if (!title || !link) {
      alert("Please enter both title and link");
      return;
    }

    try {
      const token = useAuth.getState().token;

      if (!token) {
        alert("Please sign in first");
        return;
      }

      await api.post(
        `/api/v1/content`,
        {
          link,
          title,
          type,
          tags: [],
          content,
        },
        {}
      );

      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      if (contentRef.current) contentRef.current.value = "";
      onSuccess?.();
      onClose();
    } catch (error: unknown) {
      console.error("Error adding content:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          alert("Authentication failed. Please sign in again.");
        } else {
          alert(
            `Error: ${error.response?.data?.message || "Failed to add content"}`
          );
        }
      } else {
        alert("An unexpected error occurred");
      }
    }
  }

  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen bg-black/60 fixed top-0 left-0 opacity-100 flex justify-center z-50"></div>
          <div className="w-screen h-screen fixed top-0 left-0 flex justify-center z-50">
            <div className="flex items-center  justify-center ">
              <span className="bg-[#0f1724] opacity-100 p-4 rounded fixed border border-gray-800 text-white w-[450px] z-50">
                <div className="flex justify-end">
                  <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon />
                  </div>
                </div>
                <div className="">
                  <Input reference={titleRef} placeholder="Title" />
                  <Input reference={linkRef} placeholder="Link" />
                  <textarea
                    ref={contentRef}
                    placeholder="write notes here (tweet text, article summary, etc.)"
                    className="w-[400px] px-2 m-2 border border-gray-700 bg-[#071029] text-white rounded p-2 min-h-[100px]"
                  />
                </div>
                <div className="px-4">
                  <h1 className="pb-2">Type :</h1>
                    <div className="flex gap-2 justify-center pb-2 flex-wrap">
                    <Button
                      text="Youtube"
                      variant={
                        type === ContentType.Youtube ? "primary" : "typeButton"
                      }
                      onClick={() => setType(ContentType.Youtube)}
                    />
                    <Button
                      text="Twitter"
                      variant={
                        type === ContentType.Twitter ? "primary" : "typeButton"
                      }
                      onClick={() => setType(ContentType.Twitter)}
                    />
                    <Button
                      text="LinkedIn"
                      variant={
                        type === ContentType.LinkedIn ? "primary" : "typeButton"
                      }
                      onClick={() => setType(ContentType.LinkedIn)}
                    />
                     
                    <Button
                      text="Others"
                      variant={
                        type === ContentType.Others ? "primary" : "typeButton"
                      }
                      onClick={() => setType(ContentType.Others)}
                    />
                  </div>
                </div>
                <div className="flex justify-center pt-2">
                  <Button
                    onClick={addContent}
                    variant="primary"
                    text="Submit"
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

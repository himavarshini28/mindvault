import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import { BACKEND_URL } from "../config.ts"
import axios from "axios"

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen, refresh])

  const handleDelete = async (contentId: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
        data: {
          contentId: contentId
        }
      });
      refresh();
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content. Please try again.");
    }
  };

  return (
    <div>
      <Sidebar />
      
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
        
        <div className="flex justify-end gap-4">
          <Button onClick={() => setModalOpen(true)} variant="primary" text="Add content" startIcon={<PlusIcon />} />
          
          <Button onClick={async () => {
              try {
                  const response = await axios.post(`${BACKEND_URL}/api/v1/share/brain`, {
                      share: true
                  }, {
                      headers: {
                          "authorization": localStorage.getItem("token")
                      }
                  });
                  const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                  alert(shareUrl);
              } catch (error) {
                  console.error("Error sharing brain:", error);
                  alert("Failed to generate share link. Please try again.");
              }
          }} variant="secondary" text="Share brain" startIcon={<ShareIcon />} />
        </div>

        <div className="flex gap-4 flex-wrap">
          {contents.map((content) => (
            <Card 
                key={content._id || content.link} 
                type={content.type} 
                link={content.link} 
                title={content.title}
                contentId={content._id}
                onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
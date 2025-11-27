import { useEffect, useRef, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import api from "../lib/api";
import { copyToClipBoard } from "../lib/utils"
import LinkIcon from "../icons/linkIcon"

interface Content {
  _id: string;
  link: string;
  type: "tweet" | "youtube" | "twitter";
  title: string;
  tags: string[];
  userId: string;
}

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent();
  const [searchQuery,setSearchQuery]=useState("");
  const [searchResults,setSearchResults]=useState<Content[]>([]);
  const [isSearching,setIsSearching]=useState(false);
  const [sharedUrl,setSharedUrl]=useState<string | null>();
  const [copied,setCopied]=useState(false);
  const inputRef=useRef<HTMLInputElement|null>(null)

  

  const handleSearch=async()=>{
    if(!searchQuery.trim())
    {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    try{
      setIsSearching(true);
      const response=await api.get(`/api/v1/content/search`,{ params:{query:searchQuery} });
      setSearchResults(response.data.content);
    }
    catch(error)
    {
      console.error("Error searching",error);
      alert("Search failed. Please try again");
    }
  };



  const handleClearSearch=async()=>{
    setIsSearching(false);
    setSearchQuery("");
    setSearchResults([]);
  }

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(()=>{
    if(sharedUrl && inputRef.current)
    {
      inputRef.current.focus();
      setCopied(false);
    }
  },[sharedUrl])

  useEffect(()=>{
    function onKey(e:KeyboardEvent){
      if(e.key=="Escape") setSharedUrl(null);
    }
    window.addEventListener("keydown",onKey);
    return ()=> window.removeEventListener("keydown",onKey);
  },[])

  const handleDelete = async (contentId: string) => {
    try {
      await api.delete(`/api/v1/content`, { data: { contentId: contentId } });
      refresh();
      if(isSearching)
      {
        handleSearch();
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content. Please try again.");
    }
  };

  const handleSharedBrain=async()=>{
  
              try {
                const response = await api.post(`/api/v1/share/brain`, { share: true });
                const url = `${window.location.origin}/#/share/${response.data.hash}`;
                setSharedUrl(url);
              } catch (error) {
                console.error("Error sharing brain:", error);
                alert("Failed to generate share link. Please try again.");
              }
          }
  const handleCopyClick = async () => {
    if (!sharedUrl) return;
    const ok = await copyToClipBoard(sharedUrl);
    setCopied(ok);
    // auto-clear feedback after a second
    if (ok) setTimeout(() => setCopied(false), 1500);
  };

    return (
    <div>
      <Sidebar />
      
      <div className="p-4 ml-72 min-h-screen bg-[#071029] border-2 border-gray-800 text-white">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            setModalOpen(false);
            refresh();
          }}
        />
          <div className="flex justify-end">
          <div className="flex gap-2 px-4">
            <input placeholder="search: e.g., 'tweet about DigiBrain'" value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            onKeyDown={(e)=>e.key=='Enter' && handleSearch()}
            className=" w-96 px-4 py-2 border border-gray-700 bg-[#0b1220] text-white rounded-md" />
            <Button variant="primary" text="search" onClick={handleSearch}/>
            {isSearching && 
            (
              <Button variant="secondary" text="clear" onClick={handleClearSearch}/>
            )}
          </div>
        
        <div className="flex justify-end gap-4">
          <Button onClick={() => setModalOpen(true)} variant="primary" text="Add content" startIcon={<PlusIcon />} />
          
          <Button onClick={handleSharedBrain}variant="secondary" text="Share brain" startIcon={<ShareIcon />} />
        </div>
        </div>

        <div className="flex gap-4 flex-wrap pt-5">
          {(isSearching ? searchResults:contents).map((content) => {
            console.debug("content.type:", content._id, content.type);
            return (
              <Card 
                key={content._id || content.link} 
                type={content.type} 
                link={content.link} 
                title={content.title}
                contentId={content._id}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      </div>
      {/* Share dialog */}

      {sharedUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
           <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSharedUrl(null)}
          />
           <div className="relative z-10 w-full max-w-lg mx-4">
            <div className="bg-[#071029] border border-gray-800 rounded-lg p-5 shadow-lg text-white pb-7">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold">Share your brain</h3>
                <button
                  aria-label="Close"
                  onClick={() => setSharedUrl(null)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <p className="mt-2 text-sm text-gray-300">
                Use the URL below to share a read-only view of your brain.
              </p>

            <div className="mt-4 flex gap-2 items-center">

  <div className="relative flex-1">
    <input
      ref={inputRef}
      type="text"
      readOnly
      value={sharedUrl}
      className="w-full pr-10 px-3 py-2 bg-[#071029] border border-indigo-600 
                 rounded-md text-sm text-gray-100 focus:border-indigo-600 
                 focus:outline-none focus:ring-0 focus:border-2"
      aria-label="Share URL"
    />
    <button
      onClick={() => window.open(sharedUrl!, "_blank", "noopener,noreferrer")}
      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
      aria-label="Open link"
    >
      <LinkIcon className="w-5 h-5" />
    </button>
  </div>

  {/* Copy button */}
  <button
    onClick={handleCopyClick}
    className="px-3 py-2 w-20 bg-indigo-600 hover:bg-indigo-500 rounded-md text-sm"
  >
    {copied ? "Copied!" : "Copy"}
  </button>

</div>


            </div>
          </div>
        </div>
      )}
    </div>
  );
}
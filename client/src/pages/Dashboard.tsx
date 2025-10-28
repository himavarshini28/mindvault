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

  const handleSearch=async()=>{
    if(!searchQuery.trim())
    {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    try{
      setIsSearching(true);
      const response=await axios.get(`${BACKEND_URL}/api/v1/content/search`,{
        params:{query:searchQuery},
        headers:{"authorization":localStorage.getItem("token")}
      });
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
      if(isSearching)
      {
        handleSearch();
      }
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
          <div className="flex justify-end">
          <div className="flex gap-2 px-4">
            <input placeholder="search: e.g., 'tweet about mindvault'" value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            onKeyDown={(e)=>e.key=='Enter' && handleSearch()}
            className=" w-96 px-4 py-2 border rounded-md" />
            <Button variant="primary" text="search" onClick={handleSearch}/>
            {isSearching && 
            (
              <Button variant="secondary" text="clear" onClick={handleClearSearch}/>
            )}
          </div>
        
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
        </div>

        <div className="flex gap-4 flex-wrap">
          {(isSearching ? searchResults:contents).map((content) => (
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
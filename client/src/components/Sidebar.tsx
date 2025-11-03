import LinkedinIcon from "../icons/LinkedinIcon";
import { Logo } from "../icons/Logo";
import { useNavigate } from "react-router-dom";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { useAuth } from "../store/useAuth";
export function Sidebar() {
    const clear = useAuth((s) => s.clear);
    const navigate = useNavigate();
    return <div className="h-screen bg-[#0f1724] border-r border-gray-800 w-72 fixed left-0 top-0 pl-6 text-white">
        <div className="flex text-2xl pt-8 items-center">
            <button onClick={() => navigate('/')} aria-label="Go to Home" className="flex items-center gap-2 pr-2 text-indigo-400 focus:outline-none">
                <Logo />
                <span className="font-bold">DigiBrain</span>
            </button>
        </div>
        <div className="pt-8 pl-4">
            <SidebarItem text="Twitter" icon={<TwitterIcon />} />
            <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
            <SidebarItem text="LinkedIn" icon ={<LinkedinIcon/>}/>
            <div className="mt-8">
                <button
                    onClick={() => {
                        clear();
                        try { localStorage.removeItem('auth-storage'); } catch (e) { console.warn('failed to remove auth-storage', e); }
                        navigate('/');
                    }}
                    className="px-3 py-2 bg-red-700 text-white rounded-md hover:bg-red-600"
                >
                    Sign out
                </button>
            </div>
        </div>
    </div>
}
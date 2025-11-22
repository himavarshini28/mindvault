import type { ReactElement } from "react";
import { useUI } from "../store/useUI";

export function SidebarItem({ text, icon, value, selected }: {
    text: string;
    icon: ReactElement;
    // normalized value sent to the backend / stored in UI state
    value: string;
    // whether this item is currently selected (for styling)
    selected?: boolean;
}) {
    const { setSelectedSection } = useUI();

    return (
        <div
            className={`flex text-gray-200 py-2 cursor-pointer rounded max-w-48 pl-4 transition-all duration-150 ${selected ? 'bg-[#071029]' : ''}`}
            onClick={() => {
                // toggle selection: if already selected, go to 'all'
                if (selected) setSelectedSection("all");
                else setSelectedSection(value);
            }}
        >
            <div className="pr-2">{icon}</div>
            <div>{text}</div>
        </div>
    );
}
import type { ReactElement } from "react";
import { useUI } from "../store/useUI";

export function SidebarItem({ text, icon, value, selected }: {
    text: string;
    icon: ReactElement;
    value: string;
    selected?: boolean;
}) {
    const { setSelectedSection } = useUI();

    return (
        <div
            className={`flex text-gray-200 py-2 cursor-pointer rounded max-w-48 pl-4 transition-all duration-150 ${selected ? 'bg-[#071029]' : ''}`}
            onClick={() => {
                if (selected) setSelectedSection("all");
                else setSelectedSection(value);
            }}
        >
            <div className="pr-2">{icon}</div>
            <div>{text}</div>
        </div>
    );
}
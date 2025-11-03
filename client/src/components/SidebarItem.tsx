import type { ReactElement } from "react";

export function SidebarItem({text, icon}: {
    text: string;
    icon: ReactElement;
}) {
    return (
        <div className="flex text-gray-200 py-2 cursor-pointer hover:bg-[#071029] rounded max-w-48 pl-4 transition-all duration-150">
            <div className="pr-2">
                {icon}
            </div>
            <div>
                {text}
            </div>
        </div>
    );
}
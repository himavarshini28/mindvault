import {create} from 'zustand';

interface UIstate{
    selectedSection:string,
    setSelectedSection:(s:string)=>void
}

export const useUI= create<UIstate>(
    (set)=>(
        {
            selectedSection:"all",
            setSelectedSection:(s)=>set(()=>({selectedSection:s}))
        }
    )
)
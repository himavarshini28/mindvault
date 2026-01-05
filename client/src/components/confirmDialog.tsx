import React from 'react'
import AlertIcon from '../icons/AlertIcon';
import { Button } from './Button';

interface confirmProps
{
     id: string;
  title: string;
}
const confirmDialog = ({id,title}:confirmProps) => {
  return (
    <div>
     
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
           <div
            className="absolute inset-0 bg-black/60"/>
           <div className="relative z-10 w-full max-w-lg mx-4">
            <div className="bg-[#071029] border border-gray-800 rounded-lg p-5 shadow-lg text-white pb-7">
              <div className="flex items-start justify-between gap-4">
               <AlertIcon arial-label="Close"/>
               Are you sure to delete {title} from your brain
              </div>

              <div className="flex justify-center">
                    <Button text="cancel" variant="secondary"/>
                    <button className="border border-red-600 text-red-600">delete</button>
              </div>

            </div>
          </div>
        </div>
 
    </div>
  )
}

export default confirmDialog

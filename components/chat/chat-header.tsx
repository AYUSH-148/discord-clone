import React from 'react'
import { Hash, Menu } from 'lucide-react'
import MobileToggle from '../mobile-toggle';
import { UserAvatar } from '../user-avatar';
interface ChatHeaderProps{
    serverId:string;
    name:string;
    type:"channel"|"conversation";
    imageUrl?:string;
}
const ChatHeader = ({serverId,name,type,imageUrl}:ChatHeaderProps) => {
   
  return (
    <div className='text-md font-semibold px-3 ml-2 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 '>
      <MobileToggle serverId={serverId}/>
      {type ==="channel" && (
        <Hash className='bg-white dark:bg-[#313338] flex flex-col h-full' />
      )}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className='h-8 w-8 md:h-8 md:w-8 mr-2' />
      )}
      <p className='font-semibold text-md text-black dark:text-white'>
        {name}
      </p>
    </div>
  )
}

export default ChatHeader
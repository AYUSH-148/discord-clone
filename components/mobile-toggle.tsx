import React from 'react'
import { Ghost, Menu } from 'lucide-react'
import { Sheet,SheetContent,SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import NavigationSidebar from './navigation/navigation-sidebar'
import ServerSidebar from './server/server-sidebar'
const MobileToggle = ({serverId}:{serverId:string}) => {
  return (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className='md:hidden'>
                <Menu/>
            </Button>
            <SheetContent side="left" className='px-0 flex gap-0'>
                <div className='w-[72px]'>
                    <NavigationSidebar/> 
                </div>
                <ServerSidebar serverId={serverId}/>
            </SheetContent>
        </SheetTrigger>
    </Sheet>
  )
}

export default MobileToggle

import React from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import NavigationSidebar from './navigation/navigation-sidebar'
import ServerSidebar from './server/server-sidebar'
const MobileToggle = ({ serverId }: { serverId: string }) => {
    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <div>
                        <Button variant="ghost" size="icon" className='md:hidden'>
                            <Menu />
                        </Button>
                        <SheetContent side="left" className='px-0 flex gap-0'>
                            <div className='w-[72px]'>
                                <NavigationSidebar />
                            </div>
                            <ServerSidebar serverId={serverId} />
                        </SheetContent>
                    </div>

                </SheetTrigger>
            </Sheet>
        </div>

    )
}

export default MobileToggle

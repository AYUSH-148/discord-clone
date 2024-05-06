'use client';
import { useState } from 'react';

import {  useRouter } from 'next/navigation';

import axios from 'axios';

import { useModal } from '@/hooks/use-modal-store';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import React from 'react'


const DeleteChannelModal = () => {
    const router = useRouter();
    const { isOpen, onClose, type, data } = useModal();
    const { channel,server } = data;
    const [isLoading, setIsLoading] = useState(false);
 
    const isModalOpen = isOpen && type === 'deleteChannel';

    const onDeleteConfirm = async () => {
        const url = `/api/channels/${channel?.id}?serverId=${server?.id}`;
        try {
            setIsLoading(true);
            await axios.delete(url)
            router.refresh();
            router.push(`/servers/${server?.id}`);
            onClose();
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this?{' '}
                        <span className="font-semibold text-indigo-500">
                            #{channel?.name} 
                        </span> will be permanently deleted.
                        
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-center gap-x-4 w-full">
                        <Button variant="ghost" disabled={isLoading} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={isLoading}
                            onClick={onDeleteConfirm}
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteChannelModal

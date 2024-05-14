'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios';
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { FileUpload } from '../file-upload';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
  
} from '@/components/ui/form';
import { useModal } from '@/hooks/use-modal-store';

const formSchema = z.object({
    fileUrl: z.string().min(1, { message: 'File attachment is required.' }),
});

const MessaageFileModal = () => {
    const router = useRouter();
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "messageFile";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {  fileUrl: '' },
    });
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = `${data.apiUrl}?serverId=${data?.query?.serverId}&channelId=${data?.query?.channelId} ` || ""
            await axios.post(url, {...values,
                content: values.fileUrl
            });

            form.reset();
            router.refresh();
            handleClose();
        } catch (err) {
            console.log(err);
        }
    };
    const handleClose = ()=>{
        form.reset();
        onClose();
    }


    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                       Add an attachment
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Send a file as a message.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex justify-center items-center text-center">
                                <FormField
                                    control={form.control}
                                    name="fileUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="messageFile"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                           
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="primary" disabled={isLoading} onClick={form.handleSubmit(onSubmit)}>
                                Send
                            </Button>

                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default MessaageFileModal

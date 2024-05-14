"use client";
// hydration errors occur when there is a mismatch between the server-rendered 
// HTML content and the client-side React components during hydration.

// Next.js hydration errors occur when there is a mismatch between the 
//server-rendered HTML content and the client-side React components during hydration.

// Hydration is the process by which React attaches event handlers to
// the server-rendered HTML and makes it interactive on the client-side. During hydration, 
// React compares the server-rendered HTML with the virtual DOM representation of the React components. 

import { useEffect, useState } from "react";

import { CreateServerModal } from "../modals/create-server-modal";
import InviteModal from "../modals/invite-modal";
import EditServerModal from "../modals/edit-server-modal";
import LeaveServerModal from "../modals/leave-server-modal";
import CreateChannelModal from "../modals/create-channel-modal";
import  MembersModal  from "../modals/members-modal";
import DeleteServerModal from "../modals/delete-server-modal";
import DeleteChannelModal from "../modals/delete-channel-modal";
import EditChannelModal from "../modals/edit-channel-modal";
import MessaageFileModal from "../modals/message-file-modal";
import DeleteMessageModal from "../modals/delete-message-modal";



const ModalProvider = () => {

    // solution to the hydration error
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [])
    if (!isMounted) return null;

    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <EditServerModal/>
            <EditChannelModal/>
            <LeaveServerModal/>
            <CreateChannelModal/>
            <MembersModal/>
            <DeleteServerModal/>
            <DeleteChannelModal/>
            <MessaageFileModal/>
            <DeleteMessageModal/>
        </>
    )
}

export default ModalProvider

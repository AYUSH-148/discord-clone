import { redirect } from "next/navigation";
// import { ChannelType } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from '@/lib/db';

import ServerHeader from "@/components/server/server-header";

interface IServerSidebarProps {
  serverId: string;
}

import React from 'react'

const ServerSidebar = async ({ serverId }: IServerSidebarProps) => {
  const profile = await currentProfile() || null;
  if (profile == null) return redirect('/');
  const profileId = profile.id;
  const server = await db.server.findUnique({
    where: { id: serverId },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  });

  if (server == null) redirect('/');
  const role = server.members.find((member: { profileId: string; }) => member.profileId === profileId)
    ?.role;
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
    </div>
  )
}

export default ServerSidebar


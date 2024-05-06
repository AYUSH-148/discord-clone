import { redirect } from "next/navigation";
import { ChannelType, MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from '@/lib/db';

import ServerHeader from "@/components/server/server-header";

interface IServerSidebarProps {
  serverId: string;
}
import React from 'react'
import { ScrollArea } from "../ui/scroll-area";
import ServerSearch from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, ShieldOff, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import ServerSection from "./server-section";
import ServerChannel from "./server-channel";
import ServerMember from "./server-member";

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
}
const roleIconMap = {
  [MemberRole.GUEST]: <ShieldOff className="mr-2 h-2 w-4" />,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-2 w-4 mr-2 text-indigo-500" />,
  [MemberRole.ADMIN]: <ShieldAlert className="h-2 w-4 mr-2 text-rose-500" />,
}
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

  const textChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT,
  );
  const audioChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO,
  );
  const videoChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO,
  );

  const members = server.members.filter(
    (member) => member.profileId !== profileId,
  );

  const role = server.members.find((member: { profileId: string; }) => member.profileId === profileId)
    ?.role;
  return (
    <div className=" h-full  text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch data={[
            {
              label: "Text Channels",
              type: "channel",
              data: textChannels?.map((channel) => (
                {
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }
              ))
            },
            {
              label: "Voice Channels",
              type: "channel",
              data: audioChannels?.map((channel) => (
                {
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }
              ))
            },
            {
              label: "Video Channels",
              type: "channel",
              data: videoChannels?.map((channel) => (
                {
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }
              ))
            },
            {
              label: "Members",
              type: "member",
              data: members?.map((member) => (
                {
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                }
              ))

            }
          ]} />
        </div>
      </ScrollArea>
      <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
      
      {!!textChannels?.length && (
        <div className="mb-2">
          <ServerSection sectionType="channels" channelType={ChannelType.TEXT} role={role} label="Text Channels" />
          <div className="space-y-[3px]">
            {textChannels.map((channel) => (
              <ServerChannel key={channel.id} server={server} role={role} channel={channel} />
            ))}
          </div>

        </div>
      )}
      {!!audioChannels?.length && (
        <div className="mb-2">
          <ServerSection sectionType="channels" channelType={ChannelType.AUDIO} role={role} label="Voice Channels" />
          <div className="space-y-[3px]">
            {audioChannels.map((channel) => (
              <ServerChannel key={channel.id} server={server} role={role} channel={channel} />
            ))}
          </div>

        </div>
      )}
      {!!videoChannels?.length && (
        <div className="mb-2">
          <ServerSection sectionType="channels" channelType={ChannelType.VIDEO} role={role} label="Video Channels" />
          <div className="space-y-[3px]">
            {videoChannels.map((channel) => (
              <ServerChannel key={channel.id} server={server} role={role} channel={channel} />
            ))}
          </div>

        </div>
      )}
      {!!members?.length && (
        <div className="mb-2">
          <ServerSection sectionType="members" role={role} label="Members" server={server} />
          <div className="space-y-[3px]">
            {members.map((member) => (
              <ServerMember key={member.id} member={member} server={server} />
            ))}
          </div>

        </div>
      )}

    </div>

  )
}

export default ServerSidebar


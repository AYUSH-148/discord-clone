import { redirect } from "next/navigation";
import { RedirectToSignIn, redirectToSignIn } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    }
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
    const profile = await currentProfile();
    if (profile === null) return redirectToSignIn();
    if (params.inviteCode === null) return redirect('/')
    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: { some: { profileId: profile.id } }
        }
    })
    if (existingServer !== null) return redirect(`/servers/${existingServer.id}`)

    const server = await db.server.update({
        where:{inviteCode: params.inviteCode},
        data:{
            members:{
                create:[
                    {
                        profileId: profile.id,
                    }
                ]
            }
        }
    });
    if(server!==null) return redirect(`/servers/${server.id}`)

    return null;
}

export default InviteCodePage;

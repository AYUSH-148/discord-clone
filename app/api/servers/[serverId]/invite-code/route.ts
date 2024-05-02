import { NextResponse } from "next/server";
import {v4 as uuidv4} from 'uuid'
import { currentProfile } from "@/lib/current-profile";

import {db} from '@/lib/db';

export async function PATCH(
    _req: Request,
    {params}: {params:{serverId:string}}
) {
    try{
        const profile = await currentProfile();
        if(profile===null){
            return new NextResponse('Unauthorised',{status: 401})
        }

        const serverId = params.serverId;

        if(serverId === null){
            return new NextResponse('serverId is missing',{status:400})
        }

        const server = await db.server.update({
            where:{id:serverId,profileId:profile.id},
            data: {inviteCode: uuidv4()},
        });

        return NextResponse.json(server);

    }catch(err){
        console.log('servers_[serverId]_invite-code_PATCH', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
    
}
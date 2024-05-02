import { NextResponse } from 'next/server';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

import {
    isProfileDefined,
    isRequestRouteParamDefined,
} from '@/lib/utils';

export async function PATCH(
    _req: Request,
    {params}: {params:{serverId:string}},
){
    try{
        const profile = await currentProfile();

        if (!isProfileDefined(profile)) {
          return new NextResponse('Unauthorized', { status: 401 });
        }
        const profileId = profile?.id;
        const serverId = params.serverId;
    
        if(!isRequestRouteParamDefined(serverId)){
            return new NextResponse('Server ID is missing', {status:400});
        }
        const server = await db.server.update({
            where:{
                id:serverId,
                profileId: {not: profileId},
                members:{some:{profileId}}
            },
    
            data:{
                members:{
                    deleteMany:{
                        profileId,
                    },
                },
            },
        });
        return NextResponse.json(server);
    }catch(error){
        console.log('servers_[serverId]_leave_PATCH', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
    
}
import { NextResponse } from 'next/server';

import { MemberRole } from '@prisma/client';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { isProfileDefined, isRequestSearchParamDefined } from '@/lib/utils';

export async function POST(req: Request){
    try {
        const {name,type} = await req.json();
        const {searchParams} = new URL(req.url);
        const profile = await currentProfile();
        const serverId = searchParams.get('serverId');
        if (!isProfileDefined(profile)) {
            return new NextResponse('Unauthorized', { status: 401 });
          }
        const profileId = profile.id;
        if (!isRequestSearchParamDefined(serverId)) {
            return new NextResponse('Server ID is missing', { status: 400 });
        }
        if (name === 'general') {
            return new NextResponse(`Channel name cannot be 'general'`, {
              status: 400,
            });
        }
        const server = await db.server.update({
            where:{
                id: serverId,
                members:{
                    some:{
                        profileId,
                        role:{in:[MemberRole.ADMIN,MemberRole.MODERATOR]}
                    }
                }
            },
            data:{
                channels:{
                    create:{
                        profileId,name,type,
                    },
                },
            },
        });
        return NextResponse.json(server);

    } catch (error) {
        console.log('channels_POST', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
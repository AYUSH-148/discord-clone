import { NextResponse } from 'next/server';

import { MemberRole } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    console.log({name,imageUrl});
    const profile = await currentProfile();

    if (profile == null) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const profileId = profile.id;

    const server = await db.server.create({
      data: {
        profileId,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: 'general', profileId }],
        },
        members: {
          create: [{ profileId, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log('servers_POST', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

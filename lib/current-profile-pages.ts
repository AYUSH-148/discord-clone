import { getAuth } from '@clerk/nextjs/server';

import { db } from '@/lib/db';
import { NextApiRequest } from 'next';
// This approach is commonly used when you need to perform server-side operations based
// on the authenticated user's information, such as fetching data from a database or performing authorization checks.
export const currentProfilePages = async (req:NextApiRequest) => {
  const { userId } = getAuth(req);

  if (userId == null) return null;

  const profile = await db.profile.findUnique({ where: { userId } }) || null;

  return profile;
};

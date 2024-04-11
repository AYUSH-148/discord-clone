import { auth } from '@clerk/nextjs';
import { type FileRouter, createUploadthing } from 'uploadthing/next';

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  console.log(userId)
  if (userId == null) throw new Error('Unauthorized');

  return { userId };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(handleAuth)
    .onUploadComplete(() => {}),
  messageFile: f(['image', 'pdf'])
    .middleware(handleAuth)
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

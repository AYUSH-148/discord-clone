'use client';

import Image from 'next/image';

import { FileIcon, X } from 'lucide-react';

import { OurFileRouter } from '@/app/api/uploadthing/core';
import "@uploadthing/react/styles.css";
import { UploadDropzone } from '@/lib/uploadThing';


interface IFileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile"| "serverImage" ;
}

export const FileUpload = ({ onChange, value, endpoint }: IFileUploadProps) => {
  const fileType = value.split('.').pop();

  if (value.length > 0 && fileType !== 'pdf') {
    return (
      <div className="relative h-20 w-20">
        <Image fill  src={value} alt="Uploaded Image"  className="rounded-full" />
        <button
          type="button"
          onClick={() => onChange('')}
           className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  if(value && fileType === "pdf"){
    return <div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10'>
      <FileIcon className='h-10 w-10 fill-indigo-200 stroke-inidigo-400'/>
      <a href={value} target='_blank' rel='noopener noreferrer' className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline '>
        {value}
      </a>
      <button onClick={()=>onChange("")}
      className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm'>
        <X className='h-4 w-4'/></button>
    </div>
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0].url)}
      onUploadError={(error: Error) => {
        console.log('File Upload Error', error);
      }}
    />
  );
};

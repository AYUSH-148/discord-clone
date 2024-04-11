'use client';

import Image from 'next/image';

import { X } from 'lucide-react';

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

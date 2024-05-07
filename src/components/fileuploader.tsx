import axios from 'axios';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { useCallback, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Photo from '../../public/images/icon/file-upload.svg';

type propTypes = {
    fieldChange: (files: FileWithPath[]) => void;
    photo1: FileWithPath | undefined;
    otherPhotos1: FileWithPath[] | undefined;
}

export function HotelImageUploader({ fieldChange, photo1, otherPhotos1 }: propTypes) {
    const [fileUrls, setFileUrls] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        fieldChange(acceptedFiles);
        setFileUrls(acceptedFiles.map(file => URL.createObjectURL(file)));
    }, [fieldChange]);

    useEffect(() => {
        // Update fileUrls when photo1 or otherPhotos1 changes
        const updatedUrls = [...(otherPhotos1 || []), ...(photo1 ? [URL.createObjectURL(photo1)] : [])];
        setFileUrls(updatedUrls.map(url => typeof url === 'string' ? url : URL.createObjectURL(url)));
      }, [photo1, otherPhotos1]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 5,
        accept: {
            "image/*": ['.jpg', '.png', '.jpeg', '.svg']
        }
    });

    return (
        <div>
            <div {...getRootProps()} className={'flex flex-center cursor-pointer rounded-xl gap-2 bg-dark-3'}>
                <input {...getInputProps()} className='cursor-pointer' type='file' />
                {
                    fileUrls.map((fileUrl, index) => (
                        <div key={index} className='flex flex-col gap-3'>
                            <Image
                                src={fileUrl}
                                alt='image'
                                width={500}
                                height={500}
                                className='object-cover rounded-md'
                            />
                        </div>
                    ))
                }
                
                {
                    fileUrls.length === 0 &&
                    <Image
                        src={Photo}
                        alt='upload file'
                        quality={100}
                        width={500}
                        height={500}
                        className='w-12 h-12'
                    />
                }
            </div>
            {/* <Button onClick={uploadFiles} disabled={uploading}>Upload</Button> */}
        </div>
    );
}

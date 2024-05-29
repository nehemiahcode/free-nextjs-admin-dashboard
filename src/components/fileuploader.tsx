import Image from 'next/image';
import Photo from '../../public/images/icon/file-upload.svg';
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useState } from "react"



export function HotelImageUploader() {
    const [images, setImages] = useState([]);
    const maxNumber = 69;

    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
      ) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
      };


    return (
        <div>
            <div className={'flex flex-center cursor-pointer rounded-xl gap-2 bg-dark-3'}>
                <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                >

                    {({
                        imageList,
                        onImageUpload,
                        isDragging,
                        dragProps,
                    }) => (
                        // write your building UI
                        <div className={` ${isDragging && "bg-blue-400"} flex flex-col w-full gap-3 upload__image-wrapper`}>
                            <Image
                                onClick={onImageUpload}
                                {...dragProps}
                                src={Photo}
                                alt='upload file'
                                quality={100}
                                width={500}
                                height={500}
                                className='w-12 h-12 '
                            />
                           
                           <div className="flex w-full  items-center gap-4 overflow-x-auto p-2">
                           {imageList.map((image, index) => (
                                <div key={index} >
                                    <Image src={image['data_url']} alt="Room Images" className='max-w-2xl' width={100} height={100} />
                                    <div className="image-item__btn-wrapper">
                                    </div>
                                </div>
                            ))}
                           </div>
                        </div>
                    )}
                </ImageUploading>
            </div>

        </div>
    );
}

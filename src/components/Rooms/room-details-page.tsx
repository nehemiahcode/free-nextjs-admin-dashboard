'use client'
import { IoPricetagsOutline } from 'react-icons/io5';
import { MdAdd, MdEdit, MdOutlineBedroomChild } from 'react-icons/md';
import { PiLightbulbFilamentLight } from 'react-icons/pi';
import { TbListDetails } from 'react-icons/tb';
import { Button } from '@nextui-org/button';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';
import React, { useState } from 'react';
import { IoMdHeart } from "react-icons/io";
import { MdStarRate } from "react-icons/md";
import { AlertDialogBox } from '../dialog';
import BookRoom from './bookroom';
import { UpdateRoom } from './update-room';


interface Details {
    RoomDetail: any;
    handleRateRoom: () => void;
    Id: string | null;
    roomId: string;
    userToken: string | null;
    roomDetails: { name: string; description: string };
}


export default function DetailedRoomsPage({ RoomDetail, handleRateRoom, Id, roomId, userToken, roomDetails }: Details) {
    const [active, setActive] = useState(0);
    const [rating, setRating] = useState(0);

    const handleImageClick = (index: number) => {
        setActive(index);
    };

    const imageList = [
        { index: 0, Image: RoomDetail.photo },
        ...RoomDetail.otherPhotos.map((photo: any, index: number) => ({ index: index + 1, Image: photo })),
    ];

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 w-full bg-white shadow-11 rounded-md dark:bg-black p-3'>
            <div>
                <AspectRatio ratio={16 / 9} className="bg-muted">
                    <Image
                        src={imageList[active].Image}
                        alt={`${RoomDetail.name}'s Picture`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                    />
                </AspectRatio>
                <div className='flex items-center my-3 gap-3 overflow-x-auto max-w-2xl'>
                    {imageList.map((image, index) => (
                        <div key={index} onClick={() => handleImageClick(index)} className={`cursor-pointer h-[50px] w-full max-w-[50px] rounded object-cover ${active === index ? 'border-2 border-blue-500' : ''}`}>
                            <Image src={image.Image} alt='Image' height={100} width={100} className='h-full w-full object-cover' />
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex flex-col px-2 gap-2'>
                <h1 className='font-semibold text-2xl flex items-center gap-3 py-2'><MdOutlineBedroomChild size={25} /> {RoomDetail.name}</h1>
                <p className='flex items-center gap-3'> <TbListDetails size={25} /> {RoomDetail.description}</p>
                <p className='flex items-center gap-3'><IoPricetagsOutline size={25} /> ${RoomDetail.price}</p>
                <p className='flex items-center gap-3'><PiLightbulbFilamentLight size={25} /> {RoomDetail.price}</p>
                <div className='py-3 flex gap-3 items-center'>
                 <BookRoom
                        userId={Id}
                        roomId={roomId}
                        Trigger={<Button className=" rounded-full px-5 bg-blue-600 text-white">Book room <MdAdd size={20} /></Button>} /> 

                   <UpdateRoom
                        userToken={userToken}
                        roomId={roomId}
                        roomDetails={roomDetails}
                        Trigger={<Button className=" rounded-full px-5 bg-blue-600 text-white ">Edit <MdEdit size={20} /></Button>} /> 

                    {/* {!userId &&    <AlertDialogBox  Title='Rate this room' children={<div className='flex flex-col gap-2'>
                        <input type="tel" inputMode='numeric' className='p-2 border rounded' min="0" max="5" step="0.1" value={rating} onChange={(e) => setRating(parseFloat(e.target.value))} />
                        <Button onClick={handleRateRoom}>Rate Room</Button>
                    </div>} Action={<Button endContent={<MdStarRate />} className=' rounded-full px-5 bg-blue-600 text-white'>Rate</Button>} Trigger={<Button endContent={<MdStarRate />} className=' rounded-full px-5 bg-blue-600 text-white'>Rate</Button>} />} */}
                    <div>
                        {RoomDetail.review && RoomDetail.review.length > 0 && (
                            <div >
                                <span className='flex items-center gap-1'> <IoMdHeart color='blue' size={27} />{RoomDetail.review.length}</span>
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </div>
    );
}

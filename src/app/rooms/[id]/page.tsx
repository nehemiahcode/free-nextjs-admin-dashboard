'use client'

import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { Button } from '@nextui-org/button';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoPricetagsOutline } from 'react-icons/io5';
import { MdAdd, MdEdit, MdOutlineBedroomChild } from 'react-icons/md';
import { PiLightbulbFilamentLight } from 'react-icons/pi';
import { TbListDetails } from 'react-icons/tb';
import { toast } from 'sonner';

export default function RoomDetailsPage({ params }: { params: { id: string } }) {
    const [roomDetails, setRoomDetails] = useState<any>(null); // Initialize state with null
    const userToken = localStorage.getItem("token");


    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch(`https://flexstay-backend.onrender.com/api/rooms/${params.id}`, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Content-Type': 'application/json' // Add other headers as needed
                    }
                });
                if (response.ok) {
                    const roomDetails = await response.json();
                    setRoomDetails(roomDetails);
                } else {
                    toast.error("Something went wrong");
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchRooms();
    }, [params.id]);

    return (
        <DefaultLayout>
            {roomDetails && <DetaildRooms RoomDetail={roomDetails} />} 
        </DefaultLayout>
    );
}

interface Details {
    RoomDetail: any;
}

export function DetaildRooms({ RoomDetail }: Details) {
    const [active, setActive] = useState(0);

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
                <p className='flex items-center gap-3'><PiLightbulbFilamentLight size={25} /> {RoomDetail.amenities.join(', ')}</p>
                <div className='py-3 flex gap-3 items-center'>
                    <Button className=" rounded-full px-5 bg-blue-600 text-white ">Add to wishlist <MdAdd size={20}/></Button>
                     <Button className=" rounded-full px-5 bg-blue-600 text-white ">Edit <MdEdit size={20}/></Button>
                </div>
            </div>
        </div>
    );
}

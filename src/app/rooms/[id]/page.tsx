'use client'
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import DetailedRoomsPage from '@/components/Rooms/room-details-page';
import React, { useEffect, useState } from 'react';
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
            {roomDetails && <DetailedRoomsPage RoomDetail={roomDetails} />} 
        </DefaultLayout>
    );
}



'use client'
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import DetailedRoomsPage from '@/components/Rooms/room-details-page';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function RoomDetailsPage({ params }: { params: { id: string } }) {
    const [roomDetails, setRoomDetails] = useState<any>(null); // Initialize state with null
    const userToken = localStorage.getItem("token");
    const userId = localStorage.getItem("userId")
    const [rating, setRating] = useState(0);

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
    }, [params.id, userToken]);

    // const handleAddToWishlist = async () => {
    //     try {
    //         const response = await fetch(`https://flexstay-backend.onrender.com/api/rooms/wishlist/${userId}/${params.id}`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Authorization': `Bearer ${userToken}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         if (response.ok) {
    //             setIsAddedToWishlist(!isAddedToWishlist); // Toggle the state
    //             const responseData = await response.json();
    //             if (responseData.message) {
    //                 toast.success(responseData.message); // Show success message from response
    //             } else {
    //                 toast.success("Room added to wishlist"); // Show default success message
    //             }
    //         } else {
    //             const errorData = await response.json();
    //             toast.error(errorData.message || "Failed to add room to wishlist"); // Show error message from response or default message
    //         }
    //     } catch (error) {
    //         console.error('Error adding room to wishlist:', error);
    //         toast.error('Failed to add room to wishlist');
    //     }
    // };


    const handleRateRoom = async () => {
        try {
            const response = await fetch(`https://flexstay-backend.onrender.com/api/rooms/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    ratings: rating
                })
            });

            if (response.ok) {
                toast.success('Room rated successfully');
            } else {
                toast.error('Failed to rate room');
            }
        } catch  (error) {
            console.error('Error rating room:', error);
            toast.error('Failed to rate room');
        }
    };

    return (
        <DefaultLayout>
            {roomDetails && <DetailedRoomsPage RoomDetail={roomDetails}
                handleRateRoom={handleRateRoom}
                Id={userId}
                roomId={params.id}
                userToken={userToken}
                roomDetails={roomDetails}
            // handleAdd={handleAddToWishlist} isAddedToWishlist={isAddedToWishlist}

            />}
        </DefaultLayout>
    );
}



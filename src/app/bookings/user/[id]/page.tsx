'use client'

import BookingDetailsComp from "@/components/Bookings/UserBookingDetails";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function RoomDetailsPage({ params }: { params: { id: string } }) {
    const userToken = localStorage.getItem("token");
    const [bookingDetails, setBookingDetails] = useState([]);


    useEffect(() => {
        const fetchUserBookingDetails = async () => {
            try {
                const response = await fetch(`https://flexstay-backend.onrender.com/api/bookings/userBookings?userId=${params.id}`, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Content-Type': 'application/json' // Add other headers as needed
                    }
                });
                if (response.ok) {
                    const bookingDetails = await response.json();
                    console.log('Booking Details:', bookingDetails); // Add this line
                    setBookingDetails(bookingDetails);
                } else {
                    toast.error("Something went wrong");
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserBookingDetails();
    }, [params.id, userToken]);


    return (
        <DefaultLayout>
            <Breadcrumb pageName={"Booking Details"} />
            <BookingDetailsComp bookingDetails={bookingDetails} />
        </DefaultLayout>
    )
}

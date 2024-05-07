'use client'

import BookingDetailsComponent from "@/components/Bookings/BookingDetails";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function RoomDetailsPage({ params }: { params: { bookingId: string } }) {
    const userToken = localStorage.getItem("token");
    const [bookingDetails, setBookingDetails] = useState([]);


    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await fetch(`https://flexstay-backend.onrender.com/api/bookings/${params.bookingId}`, {
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

        fetchBookingDetails();
    }, [params.bookingId, userToken]);


    return (
        <DefaultLayout>
            <Breadcrumb pageName={"Booking Details"} />
            <BookingDetailsComponent bookingDetails={bookingDetails} />
        </DefaultLayout>
    )
}

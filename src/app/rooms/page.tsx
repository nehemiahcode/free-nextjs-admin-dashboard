'use client'

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import RoomsPage from "@/components/Rooms/page";
import Photo from "../../../public/images/product/free.jpeg"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UserDetails from "@/components/Booking-table/user";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [roomDetails, setRoomDetails] = useState([]);
  const userToken = localStorage.getItem("token")
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://flexstay-backend.onrender.com/api/rooms', {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json' // Add other headers as needed
          }
        });
        if (response.ok) {
          const roomDetails = (await response.json());
          setRoomDetails(roomDetails);

          console.log(roomDetails);
          setIsLoading(false);
        } else {
          toast.error("Something went wrong")
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchRooms();
  }, []); // Add empty dependency array to run the effect only once

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Rooms"/>
      <RoomsPage RoomCard={roomDetails || []} isLoading={isLoading} />
    </DefaultLayout>
  );
}

'use client'

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import RoomsPage from "@/components/Rooms/page";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import useGetRooms from "@/hooks/useGetRooms";

export default function Home() {
  const { roomDetails, isLoading } = useGetRooms({
    userToken: localStorage.getItem("token") || "",
  })


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Rooms" />
      <RoomsPage RoomCard={roomDetails || []} isLoading={isLoading} />
    </DefaultLayout>
  );
}

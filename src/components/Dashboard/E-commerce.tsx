"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import CardDataStats from "../CardDataStats";
import { IoDuplicateOutline } from "react-icons/io5";
import { BsHouses } from "react-icons/bs";
import { IoBedOutline } from "react-icons/io5";
import { DataTableDemo, } from "../Bookings/Table";
import useGetBookings from "@/hooks/useGetBookings";
import useGetRooms from "@/hooks/useGetRooms";
import useGetBookingDetails from "@/hooks/useGetBookingById";




const ECommerce: React.FC = () => {
  const { bookings, loading } = useGetBookings({
    userToken: localStorage.getItem("token") || "",
  });

  const { roomDetails, isLoading } = useGetRooms({
    userToken: localStorage.getItem("token") || "",
  })



  const totalCapacity = roomDetails?.length; // Total capacity of the room
  const occupancy = roomDetails?.length || 0; // Current occupancy

  // Calculate occupancy percentage
  const occupancyPercentage = (occupancy / totalCapacity) * 100;


  const estimatedTotalRooms = roomDetails?.length;
  const estimatedBookings = bookings?.length;
  const occupancyRate = (estimatedBookings / estimatedTotalRooms) * 100;

  //estimate of rooms and bookings
  const estimatedRate = occupancyRate
  const estimatedRateInPercentage = estimatedRate || 0;
  const rate = (estimatedRateInPercentage / estimatedRate) * 100

  const CardData = [
    { title: "Total Bookings", counts: bookings?.length, icon: <IoDuplicateOutline size={25} />, rate: 0.2 },
    { title: "Total Rooms", counts: roomDetails?.length, icon: <IoBedOutline size={25} />, rate: occupancyPercentage.toFixed(2) + "%" },
    { title: "Estimate", counts: occupancyRate, icon: <BsHouses size={25} />, rate: rate + "%" },
  ]

  return (
    <section className="h-auto">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {CardData.map((data, index) => (
          <CardDataStats key={index} title={data.title} total={data.counts} rate={data.rate} levelUp>
            {data.icon}
          </CardDataStats>
        ))}
      </div>

      <div className="my-5 w-full">
        <ChartOne />
      </div>

      <div className="">
      <DataTableDemo data={bookings || []} />

      </div>
    </section>
  );
};

export default ECommerce;

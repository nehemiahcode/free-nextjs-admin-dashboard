import Link from 'next/link';
import React from 'react';
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";


const BookingDetailsComponent = ({ bookingDetails }:any) => {
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
   const userId = localStorage.getItem("userId")
  return (
    <div className="bg-white shadow-md rounded-md p-4 text-graydark dark:text-white dark:bg-black sm:max-w-md">
      <div className="mb-2 gap-2 flex items-center">
       <strong> Status:</strong>
        <span className={`flex items-center  gap-3 py-1 px-4 rounded-full  font-semibold ${bookingDetails.status === 'Success' ? 'text-green-500' : ' text-red'}`}>
        {bookingDetails.status === "Success" && <IoCheckmarkDoneCircleOutline size={30} color={bookingDetails.status === 'Success' ? "green" : "red"}/>}
          {bookingDetails.status}
        </span>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Date Range:</span> {formatDate(bookingDetails.dateFrom)} - {formatDate(bookingDetails.dateTo)}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Email:</span> {bookingDetails.email}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Guests:</span> {bookingDetails.guests}
      </div>
      <div>
        <span className="font-semibold">Price:</span> ${bookingDetails.price}
      </div>

      <div className='flex items-center w-full p-2'>
        <Link href={`/bookings/user/userBookings?userId=${userId}`}>user booking</Link>
      </div>
    </div>
  );
};

export default BookingDetailsComponent;

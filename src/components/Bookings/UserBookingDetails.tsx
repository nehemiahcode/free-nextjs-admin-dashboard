import React from 'react';
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";


const BookingDetailsComp = ({ bookingDetails }:any) => {
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 text-graydark dark:text-white dark:bg-black sm:max-w-md">
    {bookingDetails.map((book: { _id: React.Key | null | undefined; fullname: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
        <h1 key={book._id}>{book.fullname}</h1>
    ))}



    </div>
  );
};

export default BookingDetailsComp;

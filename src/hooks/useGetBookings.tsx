'use client'

import { useEffect, useState } from "react";

const useGetBookings = ({ userToken }: { userToken: string }): { bookings: any[], loading: boolean } => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://flexstay-backend.onrender.com/api/bookings', {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const bookingDetails = await response.json();
          setBookings(bookingDetails);
          setLoading(false);
        } else {
          throw new Error("Failed to fetch bookings");
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBooking();
  }, [userToken]); // Run the effect whenever userToken changes

  return { bookings, loading };
};

export default useGetBookings;


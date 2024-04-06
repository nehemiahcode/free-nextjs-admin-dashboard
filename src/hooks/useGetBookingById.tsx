import { useEffect, useState } from "react";
import { toast } from "sonner";

const useGetBookingDetails = ({ userToken, params }: { userToken: string; params: string }): { bookingDetails: any[], loading: boolean, params: string } => {
    const [bookingDetails, setBookingDetails] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchBookingById = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://flexstay-backend.onrender.com/api/bookings/${params}`, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Content-Type': 'application/json' // Add other headers as needed
                    }
                });
                if (response.ok) {
                    const bookingDetails = await response.json();
                    setBookingDetails(bookingDetails);
                } else {
                    toast.error("Something went wrong");
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingById();
    }, [userToken, params]);

    return { bookingDetails, loading, params };
};

export default useGetBookingDetails;

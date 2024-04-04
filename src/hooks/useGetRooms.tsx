import { useEffect, useState } from "react";
import { toast } from "sonner";

const useGetRooms = ({ userToken }: { userToken: string }): { roomDetails: any[], isLoading: boolean } => {
    const [roomDetails, setRoomDetails] = useState([]);
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
    }, [userToken]); // Run the effect whenever userToken changes

    return { roomDetails, isLoading };
};

export default useGetRooms;


import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
    userToken: string;
    params: string;
    isLoading: boolean;
    roomDetails: any[]
}

const useGetRoomsById = ({ userToken }: { userToken: string }, { params }: { params: string }): { roomDetails: any[], isLoading: boolean } => {
    const [roomDetails, setRoomDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRoomsById = async () => {
            try {
                const response = await fetch(`https://flexstay-backend.onrender.com/api/rooms/${params}`, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Content-Type': 'application/json' // Add other headers as needed
                    }
                });
                if (response.ok) {
                    const roomDetails = await response.json();
                    setRoomDetails(roomDetails);
                } else {
                    toast.error("Something went wrong");
                }
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };

        fetchRoomsById();
    }, [params]); // Run the effect whenever userToken changes

    return { roomDetails, isLoading };
};


export default useGetRoomsById;

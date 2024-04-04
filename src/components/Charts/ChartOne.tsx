
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Pie } from 'react-chartjs-2';
import useGetBookings from '@/hooks/useGetBookings';
import useGetRooms from '@/hooks/useGetRooms';

ChartJS.register(ArcElement, Tooltip, Legend);



export default function Chart() {

  const { bookings } = useGetBookings({
    userToken: localStorage.getItem("token") || "",
  });

  const { roomDetails } = useGetRooms({
    userToken: localStorage.getItem("token") || "",
  })

  const data = {


    labels: ['Bookins', 'Rooms', 'Revenue',],
    datasets: [
      {
      //   label: '# of Votes',
        data: [bookings?.length,  roomDetails?.length, 3],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-8 dark:border-strokedark dark:bg-boxdark xl:col-span-4 h-[400px] flex flex-col justify-center items-center">
       <div>
        <h2 className='font-medium'>Estimated Rates</h2>
       </div>
      <Pie data={data} />
  </div>
  );
}

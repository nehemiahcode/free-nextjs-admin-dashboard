'use client'

import { useRouter } from "next/navigation";
import Avatar from "react-avatar";
import { Button } from "../ui/button";
import Image from "next/image";

interface Props {
userCard:any[] | null
  }
  
  function UserPage({ userCard }: Props) {
    const router = useRouter();
  
  
    return (
     <div className=" grid md:grid-cols-2 gap-3">
     {userCard?.map((user, _id) => (
         <article key={_id} className='flex flex-col justify-between gap-5 bg-slate-900 my-4 p-3  shadow-5 rounded-xl max-xs:rounded-xl max-xs:p-4 xs:flex-row xs:items-center'>
         <div className='user-card_avatar'>
           <div className='relative h-12 w-12'>
             <Image
               src={user.imgUrl}
               layout="fill"
               alt='user_logo'
               className='rounded-full object-cover'
             />
           </div>
   
           <div className='flex-1 text-ellipsis'>
             <h4 className='text-base-semibold text-light-1'>{user.name}</h4>
             <p className='text-small-medium text-gray-1'>@{user.username}</p>
           </div>
         </div>
   
         <Button
           className='user-card_btn'
           onClick={() => {
               router.push(`/profile/${_id}`);
           }}
         >
           View
         </Button>
       </article>
     ))}
     </div>
    );
  }
  
  export default UserPage;
  
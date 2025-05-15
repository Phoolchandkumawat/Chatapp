import React from 'react'
import { UserAvatar } from './UserAvatar'
import { Button } from './ui/button'
import supaConfig from '../supabase/supabaseconfi'
import { useSelector } from 'react-redux'

function FriendsCard({user}) {
   const userid = useSelector((state)=> state.users.user.id)
   console.log("userid", userid, "fridnesid", user.user_id)
    const onAcceptClick = async () => {
      try { 
          const accept = await supaConfig.acceptFriendRequest({ userId: userid, friendId: user.user_id });
          console.log(accept);
          if (accept) {
              console.log("Friend request accepted successfully.");
          } else {
              console.log("No changes made, check RLS policies.");
          }
      } catch (error) {
          console.error("Error accepting friend request:", error);
      }
  };
  return (
    <div className='w-full h-26 p-2 flex flex-col items-center justify-center hover:bg-[var(--secondary)] transition-colors cursor-pointer rounded-md'>
            <div className="flex gap-2 items-center w-full">
                <UserAvatar 
                        src={'/lovable-uploads/fa857c60-a4a4-4492-a389-c2c41857bf21.png'} 
                        fallback={"dhs"} 
                        isOnline={"ture"} 
                      />    
                <div className="text flex flex-col">
                    <span className='w-26 truncate'>{user.display_name}</span>
                    <span>online</span>
                </div>  
            </div>
            <div className="flex w-full gap-x-2">
            <Button onClick={onAcceptClick} size="lg" className="bg-green-500 w-1/2 hover:bg-green-600 cursor-pointer">
            Accept
            </Button>
            <Button size="lg" className="bg-red-500 w-1/2 hover:bg-red-600 cursor-pointer">
            Reject
            </Button>

            </div>
            {/* <button className='bg-green-500 mt-3 hover:bg-green-600 cursor-pointer '>Add Friend</button> */}
    </div>
  )
}

export default FriendsCard
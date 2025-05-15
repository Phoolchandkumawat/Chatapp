import React, { useEffect, useState } from 'react'
import { UserAvatar } from './UserAvatar'
import { Button } from './ui/button'
import { cn } from '../lib/utils'
import supaConfig from '../supabase/supabaseconfi'
import { useSelector } from 'react-redux'

function SearchResult({userdata}) {
  const [useName , setUsename] = useState(false)
  const [error , setError] = useState(null)
  const userdataid = useSelector((state)=> state.users.user.id)
  const displayName = useSelector((state)=> state.users.display.display_name)
  // console.log(displayName)

  const sendFriendRequest = async ()=>{
    setError(null)
    try {
      const friend = await supaConfig.sendFriendRequest({userId:userdataid, friendId:userdata.user_id, name:displayName, reciever_name:userdata["display_name"]}) 
      if(friend){
        setUsename(true)
      }
    } catch (error) {
      setError(error)
      
    }
  }

  return (
    <div className='w-full h-20 p-2 flex items-center justify-center hover:bg-[var(--secondary)] transition-colors cursor-pointer rounded-md'>
        <div className="flex gap-2 items-center w-full">
            <UserAvatar 
                    src={'/lovable-uploads/fa857c60-a4a4-4492-a389-c2c41857bf21.png'} 
                    fallback={"dhs"} 
                    isOnline={"ture"} 
                  />    
            <div className="text flex flex-col">
                <span className='w-26 truncate'>{userdata["display_name"]}</span>
                <span>online</span>
            </div>  
        </div>
        <Button onClick={sendFriendRequest} size="lg" className="bg-green-500 mt-3 w-22 hover:bg-green-600 cursor-pointer">
        {useName == false ? "Add Friend" : "Request Sent"}
        </Button>
        {/* <button className='bg-green-500 mt-3 hover:bg-green-600 cursor-pointer '>Add Friend</button> */}
    </div>
  )
}

export default SearchResult
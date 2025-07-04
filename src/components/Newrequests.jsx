import React, { useEffect, useState } from 'react'
import FriendsCard from './FriendsCard'
import supaConfig from '../supabase/supabaseconfi'
import { useSelector } from 'react-redux'

function Newrequests() {
    const [requests, setRequests] = useState([])
    const userid = useSelector(state=> state.users.user.id)
    //   const displayName = useSelector((state)=> state.users.display.display_name)
      useEffect(()=>{
        // console.log(displayName)
        ;(async function(){
            try {
                const friends = await supaConfig.getPendingFriendRequests({userId:userid})
                setRequests(friends)
                
            } catch (error) {
                
            }
        })()
    },[userid])
  return (
    <>
    <ul className='w-full'>
      {requests?.map((users)=>(
        <FriendsCard user={users}/>
      ))}
    </ul>
    </>
  )
}

export default Newrequests
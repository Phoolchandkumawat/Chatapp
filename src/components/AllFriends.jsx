import React, { useEffect, useState } from 'react'
import supaConfig from '../supabase/supabaseconfi'
import { useDispatch, useSelector } from 'react-redux'
import { ConversationItem } from './ConversationItem'
import AllFriendsCart from './AllfriendsCart'
import { setchatuser } from '../Store/slices/ChatSlices'

function AllFriends({mobile}) {
  const [allfriends, setAllfriends] = useState([])
  const [error , setError] = useState(null)
  const userid = useSelector((state)=> state.users.user.id)
  const dispatch = useDispatch()
  useEffect(()=>{
    ;(async function(){
      setError(null)
      try {
        const allFriendsList = await supaConfig.getFriends({userId:userid})
        if(allFriendsList){
          setAllfriends(allFriendsList)
        }
      } catch (error) {
        setError(error)
      }
    })()

    
  },[])

  const onclick = (id)=>{
    dispatch(setchatuser(id))
  }
  return (
    <div className={ `space-y-1 h-[360px] overflow-y-scroll ${mobile ?  "scrollthumbmob" : "scrollthumb"}`}>
        <div className={`${allfriends.length > 0 ? "hidden": "flex"}`}>no Friends addd</div>
        {allfriends?.map((friend)=>(<AllFriendsCart key={friend.id} onClick={()=>{onclick(friend.user_id !== userid ? friend.user_id : friend.friend_id)}} id={friend.id} name={friend.user_id !== userid ? friend.display_name : friend.reciever_name} {...friend}/>))}
    </div>
  )
}

export default AllFriends
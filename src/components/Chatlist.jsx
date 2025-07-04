import React, { useEffect, useState } from 'react'
import { ConversationItem } from './ConversationItem';
import { useDispatch, useSelector } from 'react-redux';
import { setchatuser } from '../Store/slices/ChatSlices';
import supaConfig from '../supabase/supabaseconfi';


// activeconversation is not needed

const conversations = [
    {
      id: "1",
      name: "Rohini Sharma",
      avatar: "/lovable-uploads/fa857c60-a4a4-4492-a389-c2c41857bf21.png",
      lastMessage: "Hey there! How are you doing?",
      lastMessageTime: new Date(2023, 3, 12, 10, 30),
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "2",
      name: "Lea Anderson",
      avatar: "/lovable-uploads/fa857c60-a4a4-4492-a389-c2c41857bf21.png",
      lastMessage: "Let's go out!",
      lastMessageTime: new Date(2023, 3, 12, 9, 15),
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: "3",
      name: "Maya Jackson",
      avatar: "/lovable-uploads/fa857c60-a4a4-4492-a389-c2c41857bf21.png",
      lastMessage: "Can you bring the documents?",
      lastMessageTime: new Date(2023, 3, 11, 18, 45),
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "4",
      name: "Kristen Watson",
      avatar: "/lovable-uploads/fa857c60-a4a4-4492-a389-c2c41857bf21.png",
      lastMessage: "See you at the party!",
      lastMessageTime: new Date(2023, 3, 11, 16, 20),
      unreadCount: 1,
      isOnline: true,
    },
    {
      id: "5",
      name: "Robert Flores",
      avatar: "/lovable-uploads/fa857c60-a4a4-4492-a389-c2c41857bf21.png",
      lastMessage: "Don't forget about our meeting",
      lastMessageTime: new Date(2023, 3, 11, 14, 10),
      unreadCount: 0,
      isOnline: false,
    },
  ];
function Chatlist({searchTerm, activeConversation, isMobile, onToggleMobileSidebar,}) {
    const [activeUser, setActiveUser] = useState(false)
    const [allChat, setAllChat] = useState([])
    const [friend, setFriend] = useState([])
    const dataChange = useSelector(state=> state.profile)
    const filteredConversations = friend.filter(convo =>
        convo.user['display_name'].toLowerCase().includes(searchTerm.toLowerCase())
      );

      const dispatch = useDispatch()
      
      const userdataid = useSelector((state)=> state.users.user.id)
      
      const userUnread = useSelector(state => state.profile)

      useEffect(()=>{
        console.log("feslf")
        console.log("fsdf",userUnread)
        const ids = filteredConversations[0]?.user.user_id
        const userupdates = userUnread.filter((data)=> data.id == ids && data.newData.is_read == false && data.newData.sender_id == ids)
        console.log("dslfjs", userupdates)
        console.log("userid", filteredConversations[0]?.user["user_id"])
    
      },[userUnread])

      useEffect(()=>{
        // async function thisss(){
        //   try {
        //     const res = await supaConfig.subscribeSidebar({setMessages:(newMessages) =>setAllChat(newMessages)})
        //     // console.log(res)
        //   } catch (error) {
            
        //   }
        // }
        // thisss()
        console.log(dataChange)
        console.log(allChat)
        console.log(dataChange.filter((data)=> data.id).length)
      },[allChat])


      useEffect(()=>{
        console.log("sliderData Change ", dataChange)
        // console.log(dataChange)
        // console.log(dataChange.filter((data)=> data.id == "141b0462-8d2e-4dbf-9954-7699e111be4b" && data.newData.is_read== false).length)
      },[dataChange])

    useEffect(()=>{

        function sentuserid (){
            dispatch(setchatuser(activeUser))
          }
          sentuserid()

          async function getfriends (){
            try {
              const friends = await supaConfig.fetchConversationFriends({userId: userdataid})
              
              setFriend(friends)
            } catch (error) {
              
            }
          }
          
          getfriends()
    },[activeUser])
  return (
    <>
    {filteredConversations.map(conversation => (
              <ConversationItem
                key={conversation.user["user_id"]}
                {...conversation}
                unreadCount={conversation.userreadMessage + dataChange.filter((data)=> data.id == conversation.user["user_id"] && data.newData.is_read== false).length}
                id={conversation.user["user_id"]}
                name={conversation.user['display_name']}
                lastMessage={conversation.lastMessage["content"]}
                isActive={userdataid === conversation.user["user_id"]}
                onClick={() => {
                  setActiveUser([conversation.user["user_id"], conversation.user['display_name']]);
                  if (isMobile) {
                    onToggleMobileSidebar();
                  }
                }}
              />
            ))}
    </>
  )
}

export default Chatlist
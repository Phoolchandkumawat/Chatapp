
import { useState, useRef, useEffect, useCallback } from "react";
import { ChatHeader } from "../components/ChatHeader";
import { ChatMessage } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";
import { useIsMobile } from "../hooks/use-mobile";
import { useSelector } from "react-redux";
import supaConfig from "../supabase/supabaseconfi";
import { useInView } from "react-intersection-observer";


export function Chat({ conversation, currentUser, onToggleSidebar, issidebaropen }) {
  const [chatMessages, setChatMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [message, setmessage] = useState([]);
  const isMobile = useIsMobile()
  const currentChatId = useSelector(state=> state.chat[0])
  const currentChatuserName = useSelector(state=> state.chat[1])
  const userdataid = useSelector((state)=> state.users.user.id)
  const userName = useSelector((state)=> state.users.display["display_name"])
  const readSetRef = useRef(new Set());
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce:false,
  });
  async function updateRead(messageId) {
    try {
      const send = await supaConfig.markMessageAsRead(messageId)
    } catch (error) {
      console.log(error)
    }
  }

  const handleInView = (id) => {
    const isUnread = message.some(m => m.id === id && m.sender_id !== userdataid && !m.is_read);
    if (isUnread && !readSetRef.current.has(id)) {
      updateRead(id);
      readSetRef.current.add(id); // Mark this message as processed
    }
  };


  useEffect(() => {
    // Scroll to the bottom of the chat
    // Function to fetch initial messages
    console.log('useEffect triggered');
    async function getData() {
        try {
            const res = await supaConfig.getMessages({ userId: userdataid, friendId: currentChatId });
            if (res) {
                // console.log(res);
                setmessage(res);
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }

    getData();
    // console.log(message)
    

    async function getchatddd(){
      try {
        const datadd = await supaConfig.fetchConversationFriends({userId:userdataid})
        console.log("it data chat",datadd)
      } catch (error) {
        
      }
    }
    getchatddd();

    
}, [userdataid, currentChatId]); // Only run when userId or currentChatId changes

const messageRef = useRef(null)

  useEffect(() => {
    async function getdatasss() {
      try {
        const subscription = await supaConfig.subscribeToMessages({userId:userdataid, friendId:currentChatId, setMessages:(newMessages) =>{setmessage(newMessages)}});
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        
      } catch (error) {
        
      }
    }

    getdatasss();
      
}, [message]);




  const handleSendMessage = async(content) => {
    try {
      const send = await supaConfig.sendMessage({senderId:userdataid, receiverId:currentChatId, content:content, senderName:userName})
      if(send){
        // console.log(send)
      }
    } catch (error) {
      console.log(error)
    }

  };

  

  return (
    <div className="flex flex-col h-full">
      <ChatHeader 
        conversation={conversation} 
        onToggleSidebar={onToggleSidebar}
        sidbar ={issidebaropen}
        username={currentChatuserName}
      />
      
      <div className={`flex-1 overflow-y-auto p-4 bg-background ${isMobile ?  "scrollthumbmob" : "scrollthumb"}`}>
        <div className={`max-w-3xl mx-auto ds`}>
          {message && message.map((message,index) => (
            <ChatMessage
            classname="chat-message"
              data-id={message.id}
              key={message.id+index}
              content={message.content}
              sentAt={message.timestamp}
              isCurrentUser={message.sender_id == userdataid}
              senderName={message.sender_name}
              senderAvatar={""}
              attachments={message.attachments}
              ref={ref}
              onInView={handleInView}
            />
          ))}
      </div>
      <div ref={messagesEndRef} /></div>
      
      <ChatInput 
        onSendMessage={handleSendMessage} 
        onAttachFile={() => console.log("Attach file")}
      />
    </div>
  );
}


import { cn } from "../lib/utils";
import { UserAvatar } from "../components/UserAvatar";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import supaConfig from "../supabase/supabaseconfi";
import { useSelector } from "react-redux";

export function ConversationItem({
  id,
  name,
  avatar,
  lastMessage,
  lastMessageTime,
  unreadCount = 0,
  isOnline = false,
  isActive = false,
  onClick
}) {

  const [allchat, setAllChat] = useState([])
  const [allchatM, setAllChatM] = useState([])

  const userdataid = useSelector((state)=> state.users.user.id)


  useEffect(()=>{
    async function getsub (){
      try {
        const maasga = await supaConfig.getMessages({userId:userdataid, friendId:id})
        setAllChatM(maasga)
        console.log(maasga)
        const massagsecount = await supaConfig.subscribeToMessages({userId:userdataid, friendId:id, setMessages:(newMessages) =>{setAllChat(newMessages)}})
      } catch (error) {
        
      }
    }
    // setAllChatM((pre)=>[...pre,allchat]) 
    getsub()  
    console.log(allchat)
  },[allchat])

  return (
    <div 
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-[var(--secondary)] transition-colors",
        isActive && "bg-[var(--secondary)]"
      )}
      onClick={onClick}
    >
      <UserAvatar 
        src={avatar} 
        fallback={name} 
        isOnline={isOnline} 
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm truncate">{name}</h3>
        </div>
        {lastMessage && (
          <p className="text-xs text-muted-foreground truncate">{lastMessage}</p>
        )}
      </div>
      
    
        <div className="ml-auto flex-shrink-0 flex flex-col items-center justify-center">
          {lastMessageTime && (
            <span className="text-[10px] text-muted-foreground">
              {format(lastMessageTime, "h:mm a")}
            </span>
          )}
          {unreadCount > 0 &&
          (<div className="flex items-center justify-end w-full">
            <span className="text-[10px] text-white font-medium rounded-full flex min-w-4 items-center justify-center bg-[var(--green-500)]  h-5 w-5 ">{unreadCount}</span>
          </div>)}
        </div>
      
    </div>
  );
}

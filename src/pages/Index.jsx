import {useSelector,useDispatch} from 'react-redux'
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Chat } from "../components/Chat";
import { useIsMobile } from "../hooks/use-mobile";
import HomeChat from '../components/HomeChat';
import supaConfig from '../supabase/supabaseconfi';

const CURRENT_USER = {
  id: "current-user",
  name: "Angela Davis",
  avatar: "/lovable-uploads/fa857c60-a4a4-4492-a389-c2c41857bf21.png",
};

const CONVERSATIONS = [
  {
    id: "1",
    name: "Rohini Sharma",
    avatar: "/lovable-uploads/fa857c60-a4a4-4492-a389-c2c41857bf21.png",
    isOnline: true,
  },
  {
    id: "2",
    name: "Lea",
    avatar: "/lovable-uploads/fa857c60-a4a4-4492-a389-c2c41857bf21.png",
    isOnline: true,
    isTyping: false,
  },
];

const Index = () => {
  const [activeConversation, setActiveConversation] = useState("2");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const userdataid = useSelector((state)=> state?.users.user.id)
  const currentUser = useSelector((state)=> state.users)
  const isMobile = useIsMobile();
  const userChatData = useSelector((status) => status.chat)

  const handleToggleMobileSidebar = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };

  const currentConversation = CONVERSATIONS.find(c => c.id === activeConversation) || CONVERSATIONS[0];

  useEffect(()=>{
    if(isMobile){
      setIsMobileSidebarOpen(true)
    }

    
    // console.log(currentUser)

  },[isMobile])

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar
        currentUser={currentUser}
        onSelectConversation={setActiveConversation}
        activeConversation={activeConversation}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onToggleMobileSidebar={handleToggleMobileSidebar}
      />
      
      <div className="flex-1 flex flex-col">
        {isMobile ? <Chat
          conversation={currentConversation}
          currentUser={CURRENT_USER}
          issidebaropen={isMobileSidebarOpen}
          onToggleSidebar={handleToggleMobileSidebar}
        /> : userChatData == false ? <HomeChat/> : <Chat
          conversation={currentConversation}
          currentUser={CURRENT_USER}
          onToggleSidebar={handleToggleMobileSidebar}
        />}
        {/* <Chat
          conversation={currentConversation}
          currentUser={CURRENT_USER}
          onToggleSidebar={handleToggleMobileSidebar}
        /> */}
      </div>
      
      {isMobile && isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30"
          onClick={handleToggleMobileSidebar}
        />
      )}
    </div>
  );
};

export default Index;

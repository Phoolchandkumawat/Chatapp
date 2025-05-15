
import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ConversationItem } from "../components/ConversationItem";
import { UserAvatar } from "../components/UserAvatar";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { Search, Plus, Menu, MessageSquare, Users, Settings, Bell, ArrowLeft } from "lucide-react";
import { cn } from "../lib/utils";
import { useIsMobile } from "../hooks/use-mobile";
import { useDispatch, useSelector } from "react-redux";
import { setchatuser } from "../Store/slices/ChatSlices";
import AllFriends from "./AllFriends";
import SearchFriendsList from "./SearchFriendsList";
import Chatlist from "./Chatlist";
import Friendsrequasts from "./Friendsrequasts";
import Newrequests from "./Newrequests";
import supaConfig from "../supabase/supabaseconfi";

// Sample data
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



export function Sidebar({ 
  currentUser, 
  onSelectConversation, 
  activeConversation,
  isMobileSidebarOpen,
  onToggleMobileSidebar
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState('chats');
  const [activeUser, setActiveUser] = useState(false);
  const [onSearch, setOnSearch] = useState(false);
  const [frSearch, setfrSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(true)
  const [userproflieData, setUserprofileData] = useState({})
  const [isuserOnline, setIsuserOnline] = useState(false)
  const [notification, setNotification] = useState(false)
  const [notificationValue, setNotificationValue] = useState(false)
  const dispatch = useDispatch()
  const isMobile = useIsMobile();

  const filteredConversations = conversations.filter(convo =>
    convo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const searchfriends = []

  const userCurrent = useSelector(state => state.users)


  useEffect(()=>{
    async function getuserddd(){
      try {
        const users = await supaConfig.getRecentChatUser({userId: userCurrent.user.id})
        console.log(users)
      } catch (error) {
        
      }
    }
    getuserddd()

    

    async function getchatUser(){
      try {
        const datadd = await supaConfig.fetchConversationFriends({userId:userdataid})
        console.log("it data chat",datadd)
      } catch (error) {
        
      }
    }
    getchatUser();

    // console.log(userCurrent["user"].data.user)
    setUserprofileData(userCurrent["display"])
    setIsuserOnline(navigator.onLine)


  },[activeUser, onSearch])
  return (
    <div className={cn(
      "relative flex flex-col h-full bg-[var(--card)] border-r p-3",
      isMobile && "fixed inset-y-0 left-0 z-40 min-w-80 w-full transition-transform duration-300 ease-in-out transform",
      isMobile && (isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full")
    )}>
      <div className={`relative w-full h-full ${onSearch ? "hidden" : 'flex flex-col'}`}>
        <div className="flex items-center justify-between p-4 border-b ">
          <div className="flex items-center gap-2 w-[180px] min-w-[180px] max-w-[180px]">
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-[var(--accent)] cursor-pointer" onClick={onToggleMobileSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-green-600">ChatMate</h1>
          </div>
          <div className="flex items-center gap-2">
            <Bell onClick={()=> setNotification(true)} className="h-9 w-9 text-muted-foreground p-2 hover:bg-[var(--accent)] rounded-full cursor-pointer hover:text-foreground transition-colors" />
            <ThemeSwitcher />
            <UserAvatar
              src={currentUser.display["src"] && ""}
              fallback={currentUser.display['display_name'] || "username"}
              isOnline={isuserOnline}
              size="sm"
            />
          </div>
        </div>
        
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <Input
              className="pl-9 bg-secondary border-none"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex border-b">
          <Button
            variant="ghost"
            className={cn(
              "flex-1 rounded-none py-6",
              activeTab === 'chats' && "border-b-2 border-primary"
            )}
            onClick={() => setActiveTab('chats')}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Chats
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "flex-1 rounded-none py-6",
              activeTab === 'contacts' && "border-b-2 border-primary"
            )}
            onClick={() => setActiveTab('contacts')}
          >
            <Users className="h-5 w-5 mr-2" />
            Friends
          </Button>
        </div>
        
        <div className="flex-1 p-2">
          <div className="flex justify-between items-center px-2 mb-2">
            <h2 className="text-sm font-medium   text-muted-foreground">
              {activeTab === 'chats' ? 'Recent Chats' : 'All Friends'}
            </h2>
            <Button onClick={()=> {setOnSearch(!onSearch);}} variant="ghost" size="icon" className="h-8 w-8 rounded-full cursor-pointer hover:bg-[var(--accent)]">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className={`${activeTab === 'chats' ? 'flex flex-col' : 'hidden'} space-y-1 h-[360px] overflow-y-scroll ${isMobile ?  "scrollthumbmob" : "scrollthumb"}`}>
            <Chatlist searchTerm={searchTerm} activeConversation={activeConversation} isMobile={isMobile}  onToggleMobileSidebar={onToggleMobileSidebar}/>
          </div>

          <div className={`${activeTab === 'chats' ? 'hidden' : 'flex flex-col'}`}>
              <AllFriends mobile={isMobile}/>
          </div>

        </div>



        
        <div className="p-4 border-t mt-auto w-full absolute bottom-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 ">
              <UserAvatar
                src={currentUser.display["src"] && ""}
                fallback={currentUser.display['display_name'] || "username"}
                size="sm"
              />
              <div>
                <p className="text-sm font-medium">{userproflieData?.display_name || "username"}</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className={`${onSearch ? "flex flex-col": "hidden"} relative w-full h-full`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2 w-[calc(var(--spacing)*46)]">
            <div onClick={()=> setOnSearch(false)} className="flex items-center justify-center gap-1 cursor-pointer hover:underline"><ArrowLeft size={18}/>Back</div>
        </div>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
            <ThemeSwitcher />
            <UserAvatar
              src={currentUser.display["src"] && ""}
              fallback={currentUser.display['display_name'] || "username"}
              isOnline={isuserOnline}
              size="sm"
            />
          </div>
        </div>
        
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <Input
              className="pl-9 bg-secondary border-none"
              placeholder="Search..."
              value={frSearch}
              onChange={e => setfrSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 p-2">
          <div className={`relative space-y-1 h-[460px] overflow-y-scroll ${isMobile ?  "scrollthumbmob" : "scrollthumb"}`}>
            {frSearch == "" ? (<span cla>Type To Search</span>): (<div>
                <span>{searchLoading ? "Searching...": `Search Result of ${frSearch}`}</span>
                <div className="w-full h-full mt-2">
                  <SearchFriendsList usersearchname={frSearch}/>
                </div>
            </div>)}
          </div>
        </div>
        
        
        <div className="p-4 border-t mt-auto w-full absolute bottom-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserAvatar
                src={currentUser.display["src"] && ""}
                fallback={currentUser.display['display_name'] || "username"}
                size="sm"
              />
              <div>
                <p className="text-sm font-medium">{userproflieData?.display_name || "username"}</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
        <div className={`w-full h-full absolute top-0 border-r z-[999] bg-[var(--card)] ${notification ? "flex flex-col" : "hidden"}`}>
          <div className='flex px-2 py-3 items-center'>
              <ArrowLeft className='w-5 h-5' onClick={()=>notificationValue ? setNotificationValue(false) : setNotification(false)}/>
              <h4 className='ml-10'>{notificationValue ? "Friends Requests":"Notifications"}</h4>
          </div>
          <div className={`${notificationValue ? "hidden": "flex"} w-full`}>
            <Friendsrequasts onClick={()=> setNotificationValue(true)}/>
          </div>
          <div className={`${notificationValue ? "flex": "hidden"} w-full`}>
            <Newrequests/>
          </div>
        </div>

    </div>
  );
}

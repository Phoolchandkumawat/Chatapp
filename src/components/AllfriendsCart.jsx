
import { cn } from "../lib/utils";
import { UserAvatar } from "../components/UserAvatar";
import { format } from "date-fns";

export default function AllFriendsCart({
  id = "1",
  name = "username",
  avatar ="ture",
  lastMessage = "now",
  lastMessageTime = 6,
  unreadCount = 0,
  isOnline = false,
  isActive = false,
  onClick
}) {

    

  return (
    <div 
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-[var(--secondary)] transition-colors",
        isActive && "bg-secondary"
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
          
          {unreadCount > 0 &&
          (<div className="flex items-center justify-end w-full">
            <span className="text-[10px] text-white font-medium rounded-full h-4 flex min-w-4 items-center justify-center bg-[var(--green-500)] ">{unreadCount}</span>
          </div>)}
        </div>
      
    </div>
  );
}

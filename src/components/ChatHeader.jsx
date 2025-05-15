
import { Button } from "../components/ui/button";
import { UserAvatar } from "../components/UserAvatar";
import { Phone, Video, Info, Menu, ArrowLeft } from "lucide-react";

export function ChatHeader({ conversation, onToggleSidebar, sidbar,username ="user"}) {
  return (
    <div className="flex items-center justify-between mt-2 p-6 border-b bg-card">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden hover:bg-[var(--accent)] cursor-pointer" onClick={onToggleSidebar}>
          {sidbar ? <Menu className="h-5 w-5 " />: <ArrowLeft className="h-5 w-5" />}
          {/* <Menu className="h-5 w-5" /> */}
        </Button>
        <UserAvatar
          src={conversation.avatar}
          fallback={conversation.name}
          isOnline={conversation.isOnline}
        />
        <div className="ml-3">
          <h2 className="font-medium">{username}</h2>
          <p className="text-xs text-muted-foreground">
            {conversation.isTyping 
              ? "Typing..." 
              : conversation.isOnline 
                ? "Online" 
                : conversation.lastSeen 
                  ? `Last seen ${conversation.lastSeen.toLocaleDateString()}` 
                  : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex gap-1">
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Info className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

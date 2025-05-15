
import { cn } from "../lib/utils";
import { UserAvatar } from "../components/UserAvatar";
import { format } from "date-fns";
import React, { forwardRef } from "react";
import { useInView } from "react-intersection-observer";

export const ChatMessage = forwardRef(function ChatMessage({
  content,
  sentAt,
  isCurrentUser,
  senderName,
  senderAvatar,
  attachments,
  classname = "",
  onInView,
  ...props
},ref) {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the message is visible
  });
  // Call the onInView function when the message comes into view
  React.useEffect(() => {
    if (inView) {
      onInView(props['data-id']); // Pass the message id
    }
  }, [inView, onInView, props]);
  return (
    <div {...props} ref={inViewRef} className={cn(
      `flex gap-2 mb-4 ${classname}`,
      isCurrentUser ? "flex-row-reverse" : "flex-row"
    )}>
      {!isCurrentUser && (
        <UserAvatar 
          src={senderAvatar} 
          fallback={senderName} 
          size="sm" 
          className="mt-1"
        />
      )}
      <div className={cn(
        "flex flex-col",
        isCurrentUser ? "items-end" : "items-start"
      )}>
        {!isCurrentUser && (
          <span className="text-xs text-muted-foreground mb-1">{senderName}</span>
        )}
        
        {attachments && attachments.length > 0 && (
          <div className={cn(
            "grid gap-1 mb-1",
            attachments.length > 1 ? "grid-cols-2" : "grid-cols-1"
          )}>
            {attachments.map((attachment, i) => (
              attachment.type === "image" ? (
                <div key={i} className="rounded-lg overflow-hidden">
                  <img 
                    src={attachment.url} 
                    alt={attachment.name || "Attachment"} 
                    className="h-32 w-full object-cover"
                  />
                </div>
              ) : (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-background border">
                  <div className="bg-primary/10 p-2 rounded">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9M13 2L20 9M13 2V9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-sm truncate max-w-[100px]">{attachment.name || "File"}</span>
                </div>
              )
            ))}
          </div>
        )}
        
        <div className={cn(
          isCurrentUser ? "chat-bubble-sent" : "chat-bubble-received",
        )}>
          {content}
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {format(sentAt, "h:mm a")}
        </span>
      </div>
    </div>
  );
}
)
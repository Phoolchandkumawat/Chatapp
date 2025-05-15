
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Smile, PaperclipIcon, Send, Image, Mic } from "lucide-react";

export function ChatInput({ onSendMessage, onAttachFile }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t bg-card">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="min-h-[56px] resize-none pr-12 bg-background"
          />
          <div className="absolute right-3 bottom-2 flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <Smile className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={onAttachFile}>
            <PaperclipIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Image className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Mic className="h-5 w-5" />
          </Button>
          <Button onClick={handleSend} size="icon" className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

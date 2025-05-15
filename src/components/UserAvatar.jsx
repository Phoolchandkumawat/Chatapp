
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { cn } from "../lib/utils";

export function UserAvatar({ 
  src, 
  fallback, 
  className, 
  isOnline = false, 
  size = "md" 
}) {
  const sizeClass = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14"
  };

  return (
    <div className={cn("relative", className)}>
      <Avatar className={cn(sizeClass[size], isOnline && "avatar-online")}>
        <AvatarImage src={src} alt={fallback} />
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          {fallback.split(" ").map(n => n[0]).join("").toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

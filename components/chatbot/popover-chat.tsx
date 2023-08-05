import Chat from "@/components/chatbot/chat";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MessageCircle } from "lucide-react";

export default function PopoverChat() {
  return (
    <Popover>
      <PopoverContent align="start" className="mr-4 w-[400px]">
        <Chat />
      </PopoverContent>
      <PopoverTrigger asChild className="fixed bottom-4 right-4">
        <Button
          variant="outline"
          className="rounded-full w-12 h-12 aspect-square px-2 bg-black hover:bg-gray-700"
        >
          <MessageCircle size={24} className="text-white" />
        </Button>
      </PopoverTrigger>
    </Popover>
  );
}

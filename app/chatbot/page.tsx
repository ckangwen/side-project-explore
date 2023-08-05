// from https://github.com/mendableai/mendable-nextjs-chatbot
import PopoverChat from "@/components/chatbot/popover-chat";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Chatbot',
  description: 'Chatbot | shadcn/ui 使用示例',
}


export default function Page() {

  return (
    <main className="w-screen h-screen">
      <PopoverChat />
    </main>
  )
}
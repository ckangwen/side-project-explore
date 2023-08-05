"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "ai/react";
import { Triangle } from "react-loader-spinner";
import Bubble from "@/components/chatbot/bubble";
import chatConfig from "@/components/chatbot/config";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  const scrollAreaRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{ chatConfig.title }</CardTitle>
        <CardDescription className=" leading-3">{ chatConfig.description }</CardDescription>
      </CardHeader>
      <CardContent className="">
        <ScrollArea
          ref={scrollAreaRef}
          className="h-[450px] overflow-y-auto w-full spacy-y-4 pr-4"
        >
          <Bubble
            message={{
              role: "assistant",
              content: chatConfig.welcomeMessage,
              id: "initial-assistant-message",
            }}
          />
          {messages.map((message) => (
            <Bubble key={message.id} message={message} />
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center w-full space-x-2"
        >
          <Input
            placeholder="Type your message"
            value={input}
            onChange={handleInputChange}
          />
          <Button disabled={isLoading}>
            {isLoading ? (
              <div className="flex gap-2 items-center">
                <Triangle
                  height={16}
                  width={16}
                  color="#fff"
                  ms-visible={true}
                />
                {"Loading..."}
              </div>
            ) : (
              "Send"
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

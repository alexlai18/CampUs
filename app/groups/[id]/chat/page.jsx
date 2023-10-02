"use client"
import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Check, Plus, Send } from "lucide-react"
import { FullNav } from "@/components/navigation/FullNav"
import { Separator } from "@/components/ui/separator"
import { getGroup } from "@/api/apiClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatSkeleton } from "@/components/skeletons/ChatSkeleton"

export default function GroupChatPage({ params }) {
  const { id } = params;

  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{user: true, content: "Hello"}, {user: false, content: "Wassup"}]);

  const inputLength = input.trim().length;
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom everytime a new message is sent
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load information in
  useEffect(() => {
    setLoading(true);
    const load = async () => {
      const get = await getGroup(id);
      setInfo(get);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="hidden flex-col md:flex">
      <FullNav />
      <div className="hidden space-y-6 p-10 pb-0 md:block">
        {/* Chat feature here */}
        {
          loading ?
            <ChatSkeleton />
          :
            <Card className="h-[800px] relative">
              <CardHeader className="flex flex-col items-left pb-0">
                <h2 className="text-2xl font-bold tracking-tight">{info.name}</h2>
                <p className="text-muted-foreground">
                  Aiming for {info.target} in {info.courseCode}
                </p>
              </CardHeader>
              <Separator className="my-6 mb-0" />
              <CardContent className="h-[600px]">
                <ScrollArea className="h-full">
                  <div className="space-y-4 h-[50px]">
                    {messages.map((m) => {
                      return (<div
                        key={m.content}
                        className={cn(
                          "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                          m.user === true ? "ml-auto bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        {m.content}
                      </div>)
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="absolute bottom-0 w-full">
                <form
                  onSubmit={(event) => {
                    event.preventDefault()
                    if (inputLength === 0) return;
                    setMessages([
                      ...messages,
                      {user: true, content: input}
                    ])
                    setInput("");
                  }}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    id="message"
                    placeholder="Type your message..."
                    className="flex-1"
                    autoComplete="off"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                  />
                  <Button type="submit" size="icon" disabled={inputLength === 0}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
        }
      </div>
    </div>
  )
}
"use client"
import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Check, Plus, Send } from "lucide-react"
import { Icons } from "@/components/ui/icons"
import { FullNav } from "@/components/navigation/FullNav"
import { Separator } from "@/components/ui/separator"
import { addMessage, getGroup, getGroupMessages } from "@/api/apiClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatSkeleton } from "@/components/skeletons/ChatSkeleton"
import { useSelector } from "react-redux"

export default function GroupChatPage({ params }) {
  const { id } = params;

  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);

  const inputLength = input.trim().length;
  const messagesEndRef = useRef(null);

  const userId = useSelector((state) => state.authenticationState.value).userId;
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
      setMessages(await getGroupMessages(id));
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
                  <div className="space-y-4 h-[50px] pb-2">
                    {
                      messages.length > 0 ?
                          messages.map((m) => {
                            return (
                              <div className={cn("flex", m.sender === userId ? "flex flex-row-reverse gap-2 justify-end" : "flex flex-row gap-2")} >
                                <Avatar className="h-9 w-9">
                                  <AvatarImage alt="Avatar" />
                                  <AvatarFallback className={m.sender === userId ? "bg-muted" : "bg-primary text-primary-foreground"}>USR</AvatarFallback>
                                </Avatar>
                                <div
                                  key={m._id}
                                  className={cn(
                                    "flex w-max max-w-[30%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                                    m.sender === userId ? "flex-wrap bg-primary text-primary-foreground"
                                      : "flex-wrap bg-muted"
                                  )}
                                >
                                  {m.content}
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className={cn("flex", m.sender === userId ? "rounded-full ml-auto" : "rounded-full")}
                                      onClick={() => setOpen(true)}
                                    >
                                      <Plus className="h-4 w-4" />
                                      <span className="sr-only">Message Settings</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="w-56" side="right" align="start">
                                    <DropdownMenuItem>Reply</DropdownMenuItem>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            )
                        })
                      :
                        <div className="text-center mt-5 text-muted-foreground">Start the conversation!</div>
                    }
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="absolute bottom-0 w-full">
                <form
                  onSubmit={async (event) => {
                    setSending(true);
                    event.preventDefault()
                    if (inputLength === 0) return;
                    const content = input;
                    setInput("");
                    setMessages([
                      ...messages,
                      {
                        groupId: id,
                        sender: userId,
                        content,
                        timestamps: {
                          createdAt: new Date(),
                          updatedAt: new Date()
                        }
                      }
                    ])
                    await addMessage({
                      sender: userId,
                      content,
                      timestamps: {
                        createdAt: new Date(),
                        updatedAt: new Date()
                      },
                      groupId: id
                    })
                    setSending(false);
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
                    {
                      sending ? <Icons.spinner className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />
                    }
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
        }
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="gap-0 p-0 outline-none">
            <DialogHeader className="px-4 pb-4 pt-5">
              <DialogTitle>New message</DialogTitle>
              <DialogDescription>
                Invite a user to this thread. This will create a new group
                message.
              </DialogDescription>
            </DialogHeader>
            <Command className="overflow-hidden rounded-t-none border-t">
              <CommandInput placeholder="Search user..." />
              <CommandList>
                <CommandEmpty>No users found.</CommandEmpty>
              </CommandList>
            </Command>
            <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
              <Button
                onClick={() => {
                  setOpen(false)
                }}
              >
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
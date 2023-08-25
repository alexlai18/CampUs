import { useRouter } from "next/navigation"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    DropdownMenuButtonItem,
  } from "@/components/ui/dropdown-menu"
import { getUserDetails } from "../mockData";
import { useEffect, useState } from "react";
  
  export function ProfileNav() {
    const router = useRouter();
    const email = sessionStorage.getItem("email");
    const [initials, setInitials] = useState("");
    const [name, setName] = useState("");
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
      const details = getUserDetails(email);
      if (!details) {
        router.push("/");
      } else {
        setUserDetails(details);
        setInitials(details.fname.slice(0, 1) + details.lname.slice(0, 1));
        setName(details.fname + " " + details.lname)
      }
    })

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="@shadcn" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                Student at {userDetails.uni}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuButtonItem onClick={() => {router.push('/')}}>
            Log Out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuButtonItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
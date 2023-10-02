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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { setAuthenticationState } from "@/app/store/reducers/authenticationState";
import { useSelector } from "react-redux"
import { setUserDetailState } from "@/app/store/reducers/userDetailState";
import { setUserNotifState } from "@/app/store/reducers/userNotifState";
  
export function ProfileNav() {
  const router = useRouter();
  const [initials, setInitials] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.authenticationState.value);
  const details = useSelector((state) => state.userDetailState.value);

  useEffect(() => {
    const { email } = userAuth;
    setEmail(email);
    if (!details || Object.keys(details).length === 0) {
      router.push(`/newuser/?email=${email}`);
    } else {
      setUserDetails(details);
      setInitials(details.fname.slice(0, 1) + details.lname.slice(0, 1));
      setName(details.fname + " " + details.lname);
    }
  }, [email, router])

  const handleLogout = () => {
    dispatch(setAuthenticationState({}));
    dispatch(setUserDetailState({}));
    dispatch(setUserNotifState([]));
    router.push('/');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage alt="@shadcn" />
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
          <DropdownMenuButtonItem onClick={() => router.push(`/profile?email=${email}`)}>
            Profile
          </DropdownMenuButtonItem>
          <DropdownMenuButtonItem onClick={() => router.push('/settings')}>
            Settings
          </DropdownMenuButtonItem>
          <DropdownMenuItem onClick={() => router.push('/newgroup')}>Create New Group</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuButtonItem onClick={handleLogout}>
          Log Out
        </DropdownMenuButtonItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
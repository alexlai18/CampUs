"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { setAuthenticationState } from "@/app/store/reducers/authenticationState"
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux';

// ShadCN UI components
import { RocketIcon } from "lucide-react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

// User functions
import { ScrollArea } from "@/components/ui/scroll-area"
import { ErrorPopup } from "../utils/ErrorPopup"
import { createGroup, getConnections, getCourses, updateUser } from "@/api/apiClient"
import { setUserDetailState } from "@/app/store/reducers/userDetailState"

export function NewGroupForm() {
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("You must fill out all the fields!");
  const [course, setCourse] = useState("");
  const [target, setTarget] = useState("");
  const [openTarget, setOpenTarget] = useState(false);
  const targetList = ["PS", "CR", "D", "HD"];
  const [connections, setConnections] = useState(["Loading..."]);
  const [courses, setCourses] = useState(["Loading..."]);
  const [openCourse, setOpenCourse] = useState(false);
  const router = useRouter();
  const userAuth = useSelector((state) => state.authenticationState.value);
  const [users, setUsers] = useState([userAuth.email]);
  const [severity, setSeverity] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getVals = async () => {
      setConnections(await getConnections("", userAuth.email));
      const cList = await getCourses("");
      const courseRes = []
      cList.map((c) => {
        courseRes.push(c.code);
      })
      setCourses(courseRes);
    }
    getVals();
  }, [])

  const isChecked = (email) => {
    return users.includes(email);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (target === "" || course === "") {
      setMsg("You must fill out all the fields!");
      setSeverity(true);
      setError(true);
      return;
    }
    const details = {
      courseCode: course.toUpperCase(),
      members: users,
      target: target.toUpperCase(),
    }
    setIsLoading(true);
    const res = await createGroup(details)
    if (res) {
      setMsg("Successfully Created Group!");
      setSeverity(false);
      setTimeout(() => {
        setIsLoading(false);
        router.push('/dashboard');
      }, 2000);
    } else {
      setMsg("There was an issue creating a group. Try again later");
      setSeverity(true);
      setError(true);
      setIsLoading(false);
    }
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
      )}
    >
      <Card>
        <CardHeader className="space-y-1">
          {error && 
            <ErrorPopup
              severity={severity}
              message={msg}
            />
          }
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="course">What course is this group for?</Label>
                <Popover open={openCourse} onOpenChange={setOpenCourse} modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCourse}
                      className="justify-between"
                    >
                      {course
                        ? courses.find((obj) => obj.toLowerCase() === course.toLowerCase())
                        : "Select Course"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] h-[300px] p-0" side="right" align="start">
                    <Command>
                      <CommandInput placeholder="Course" className="h-9"/>
                      <CommandEmpty>No course found.</CommandEmpty>
                      <ScrollArea className="flex h-[300px] flex-col" type="always">
                        <CommandGroup>
                          {courses.map((code) => (
                            <CommandItem
                              key={code}
                              onSelect={(currentValue) => {
                                setCourse(currentValue === course ? "" : currentValue)
                                setOpenCourse(false)
                              }}
                              value={code}
                            >
                              {code}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  course.toLowerCase() === code.toLowerCase() ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="members">Add members</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="justify-between">
                      Add Users
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {connections.map((c) => {
                      return (
                        <DropdownMenuCheckboxItem
                          checked={isChecked(c.email)}
                          onCheckedChange={() => {
                            if (users.includes(c.email)) {
                              setUsers(users.filter(function (email){
                                return email !== c.email;
                              }))
                            } else {
                              const userList = users;
                              userList.push(c.email)
                              setUsers(userList)
                            }
                          }}
                          key={c.email}
                        >
                          {c.fname} {c.lname} - {c.email}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course">What is your goal!</Label>
                <Popover open={openTarget} onOpenChange={setOpenTarget} modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openTarget}
                      className="justify-between"
                    >
                      {target
                        ? targetList.find((obj) => obj.toLowerCase() === target)
                        : "Select Goal"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] h-[140px] p-0" side="right" align="start">
                    <Command>
                      <CommandGroup>
                        {targetList.map((t) => (
                          <CommandItem
                            key={t}
                            onSelect={(currentValue) => {
                              setTarget(currentValue === target.toLowerCase() ? "" : currentValue)
                              setOpenTarget(false)
                            }}
                            value={t}
                          >
                            {t}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                target.toLowerCase() === t.toLowerCase() ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Set up camp!
                  </span>
                </div>
              </div>
              <div className="pt-6">
                <Button className="w-full">
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <RocketIcon className="h-4 w-4" />&nbsp;&nbsp;Create Group
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// ShadCN UI components
import { RocketIcon } from "lucide-react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// User functions
import { addUserDetails, dataStore } from "../mockData"
import { getUniversities } from "@/api/getUniversities"
import { ScrollArea } from "@/components/ui/scroll-area"

export function NewUserForm(props) {
  // Note: Will probably have an API that gets all the universities in Australia and have an autocomplete search
  const { email } = props;
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [grade, setGrade] = useState("");
  const [uni, setUni] = useState("");
  const [uniList, setUniList] = useState(["Loading..."])
  const [open, setOpen] = useState(false)
  const router = useRouter(); 

  useEffect(() => {
    const getUni = async() => {
      setUniList(await getUniversities());
    }
    getUni();
  }, [])

  const onSubmit = (event) => {
    event.preventDefault();
    sessionStorage.setItem("email", email);
    const capitalisedUni = uni.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    const details = {
      email,
      fname,
      lname,
      grade,
      uni: capitalisedUni,
    }
    addUserDetails(email, details);
    router.push("/dashboard");
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
      )}
    >
      <Card>
        <CardHeader className="space-y-1">
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="fname">What is your first name?</Label>
                <Input id="fname" placeholder="John" onChange={(e) => setFName(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lname">What is your last name?</Label>
                <Input id="lname" placeholder="Smith" onChange={(e) => setLName(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="grade">What year are you in?</Label>
                <Popover open={open} onOpenChange={setOpen} modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="justify-between"
                    >
                      {uni
                        ? uniList.find((uniN) => uniN.toLowerCase() === uni)
                        : "Select University"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] h-[300px] p-0" side="right" align="start">
                    <Command>
                      <CommandInput placeholder="University" className="h-9" />
                      <CommandEmpty>No university found.</CommandEmpty>
                      <ScrollArea className="flex h-[300px] flex-col" type="always">
                        <CommandGroup>
                          {uniList.map((uniN) => (
                            <CommandItem
                              key={uniN}
                              onSelect={(currentValue) => {
                                setUni(currentValue === uni ? "" : currentValue)
                                setOpen(false)
                              }}
                              value={uniN}
                            >
                              {uniN}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  uni === uniN ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Label htmlFor="grade">What year are you in?</Label>
                <Select id="grade" onValueChange={(value) => setGrade(value)}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year or Above</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Begin your journey
                  </span>
                </div>
              </div>
              <div className="pt-6">
                <Button className="w-full"><RocketIcon className="h-4 w-4" />&nbsp;&nbsp;Enter CampUs</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

// ShadCN UI components
import { RocketIcon } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// User functions
import { addUserDetails, dataStore } from "../mockData"

export function NewUserForm(props) {
  // Note: Will probably have an API that gets all the universities in Australia and have an autocomplete search
  const { email } = props;
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [grade, setGrade] = useState("");
  const [uni, setUni] = useState("");
  const router = useRouter(); 

  const onSubmit = (event) => {
    event.preventDefault();
    const details = {
      email,
      fname,
      lname,
      grade,
      uni,
    }
    addUserDetails(email, details);
    console.log(dataStore["userdetails"]);
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
              <div className="grid gap-2">
                <Label htmlFor="uni">What university do you go to?</Label>
                <Input id="uni" onChange={(e) => setUni(e.target.value)} required />
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
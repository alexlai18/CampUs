"use client"

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FullNav } from '../components/navigation/FullNav';
import { getCourses } from '../mockData';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { getUserDetails } from '../mockData';

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({});
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email")
    setEmail(storedEmail);
    const details = getUserDetails(storedEmail);
    if (!details) {
      router.push("/");
    } else {
      setUserDetails(details);
      setInitials(details.fname.slice(0, 1) + details.lname.slice(0, 1));
      setName(details.fname + " " + details.lname)
    }
  }, [email, router])

  const handleSubmit = (event) => {
    event.preventDefault();
    setCourseList(getCourses(search));
  }

  return (
    <>
      <div className="hidden flex-col md:flex">
        <FullNav />
        <div className="flex space-y-4 p-8 pt-6 justify-center">
          <Card className=" bg-secondary w-[60%] ml-4">
            <CardHeader>
              <Avatar className="overflow-hidden bg-border rounded-full h-[200px] w-[200px]">
                <AvatarImage alt="profile" src="./assets/profile.jpg" className="w-full h-full"/>
                <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              {name}
              <br/>
              Student at {userDetails.uni} - Year {userDetails.grade}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

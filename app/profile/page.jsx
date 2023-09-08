"use client"

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FullNav } from '../../components/navigation/FullNav';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { AboutMeCard } from '../../components/dashboard-cards/AboutMeCard';
import { Loading } from '../../components/utils/Loading';
import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({});
  const [initials, setInitials] = useState("");
  const [loading, setLoading] = useState(true);
  const details = useSelector((state) => state.userDetailState.value);
  const userAuth = useSelector((state) => state.authenticationState.value);

  useEffect(() => {
    const storedEmail = userAuth.email;
    setEmail(storedEmail);
    if (!details) {
      router.push("/");
    } else {
      const about = details.about;
      setAboutMe(about ? about : "");
      setUserDetails(details);
      setInitials(details.fname.slice(0, 1) + details.lname.slice(0, 1));
      setName(details.fname + " " + details.lname)
      setLoading(false);
    }
  }, [email, router])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div className="hidden flex-col md:flex">
        <FullNav />
        <div className="flex justify-center">
          <div className="flex flex-col w-[60%] pt-6">
            <Card className=" bg-secondary w-full">
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
            <AboutMeCard aboutMe={aboutMe} setAboutMe={setAboutMe} />
          </div>
        </div>
      </div>
    </>
  )
}

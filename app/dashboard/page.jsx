"use client"

import { useEffect, useState } from 'react'
import { CalendarDateRangePicker } from '../components/CalendarDateRangePicker'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { FullNav } from '../components/FullNav'
import { getAverageRating, getGroupMates, getUserAbout, getUserDetails } from '../mockData'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [userDetails, setUserDetails] = useState({});
  const [aboutMe, setAboutMe] = useState("");
  const [favGroupMates, setFavGroupMates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const email = sessionStorage.getItem("email")
    const details = getUserDetails(email);
    if (!email || !details) {
      router.push("/");
    } else {
      setUserDetails(details);
      const about = getUserAbout(email)
      setAboutMe(about ? about : "");
      const mates = getGroupMates(email);
      setFavGroupMates(mates ? mates : []);
      setRating(getAverageRating(email));
      setLoading(false);
    }
  }, []);

  const handleEdit = () => {
  }

  if (loading) {
    return (
      <>
        <div className="hidden flex-col items-center md:flex w-full">
          <div className="flex-1 space-y-4 items-center justify-between">
            <Icons.pagespinner className="container  h-[400px] animate-spin text-primary" />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="hidden flex-col md:flex">
        <FullNav />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Hi {userDetails.fname}!</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="notifications">
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Current Load
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {/* We will get this information from how many courses they have joined */}
                      3 Courses
                    </div>
                    <p className="text-xs text-muted-foreground">
                      23 Courses Enrolled All-Time
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Groups
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">6 Groups</div>
                    <p className="text-xs text-muted-foreground">
                      20 Groups Joined All-Time
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Overall Rating
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{rating}</div>
                    <p className="text-xs text-muted-foreground">
                      Group Partners Rated You 8.7 Last Term
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <div className="flex items-center justify-between space-y-2">
                      <CardTitle>About You</CardTitle>
                      <Button onClick={handleEdit}>Edit</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-l">
                      {aboutMe}
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Favourite Groupmates</CardTitle>
                    <CardDescription>
                      These are {userDetails.fname}'s top groupmates.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {favGroupMates.map((mate) => {
                        return(
                          <div className="flex items-center" key={`groupmate-${mate.email}`}>
                            <Avatar className="h-9 w-9">
                              <AvatarImage src="/avatars/01.png" alt="Avatar" />
                              <AvatarFallback>{mate.initials}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                              <p className="text-sm font-medium leading-none">{mate.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {mate.email}
                              </p>
                            </div>
                            <div className="ml-auto font-medium">{mate.course}</div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

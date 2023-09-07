"use client"

import { useEffect, useState } from 'react'
import { Icons } from '@/components/ui/icons'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { FullNav } from '../components/navigation/FullNav'
import { getAverageRating, getGroupMates, getNotifications, getUserAbout } from '../mockData'
import { useRouter } from 'next/navigation'
import { NotifCard } from '../components/dashboard-cards/NotifCard'
import { GroupMateCard } from '../components/dashboard-cards/GroupMateCard'
import { AboutMeCard } from '../components/dashboard-cards/AboutMeCard'
import { CurrentLoadCard } from '../components/dashboard-cards/CurrentLoadCard'
import { DashboardGroupCard } from '../components/dashboard-cards/DashboardGroupCard'
import { DashboardRatingCard } from '../components/dashboard-cards/DashboardRatingCard'
import { Loading } from '../components/utils/Loading'
import { useSelector } from 'react-redux'

export default function Dashboard() {
  const [userDetails, setUserDetails] = useState({});
  const [aboutMe, setAboutMe] = useState("");
  const [favGroupMates, setFavGroupMates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [notifs, setNotifs] = useState([]);
  const router = useRouter();
  const userAuth = useSelector((state) => state.authenticationState.value);
  const details = useSelector((state) => state.userDetailState.value);

  useEffect(() => {
    const email = userAuth.email;
    if (email === undefined) {
      router.push("/");
    } else if (details === undefined) {
      router.push(`/newuser/?email=${email}`)
    } else {
      setUserDetails(details);
      setAboutMe(details.about ? details.about : "");
      const mates = getGroupMates(email);
      setFavGroupMates(mates ? mates : []);
      setRating(getAverageRating(email));

      const ping = getNotifications(email);
      setNotifs(ping ? ping : [])
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <Loading />
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
                <CurrentLoadCard />
                <DashboardGroupCard />
                <DashboardRatingCard rating={rating} />
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <AboutMeCard aboutMe={aboutMe} setAboutMe={setAboutMe} />
                <GroupMateCard favGroupMates={favGroupMates} userDetails={userDetails} />
              </div>
            </TabsContent>
            <TabsContent value="notifications" className="space-y-1">
              {notifs.length > 1 ? notifs.map((notif) => {
                return <NotifCard key={`notif-${notif}`} notif={notif} />
              }) : <div className='text-lg font-medium'>No notifications</div>}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

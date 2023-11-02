"use client"

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
import { getUser, getUserDetails, getConnections, addConnections, removeConnection } from '@/api/apiClient';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { Icons } from '@/components/ui/icons';

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [friends, setFriends] = useState(false);
  const [name, setName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({});
  const [initials, setInitials] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const userAuth = useSelector((state) => state.authenticationState.value);
  const searcherEmail = userAuth.email;
  const searcherId = userAuth.userId;

  useEffect(() => {
    const getInfo = async () => {
      const user = await getUser("email", email);
      const userId = user.details[0];
      const details = await getUserDetails(userId);

      // If there are no details, then the user is not properly authenticated
      if (!details) {
        router.push("/");
      } else {
        const fList = await getConnections("", searcherEmail);
        fList.map((f) => {
          if (f.email === email) {
            setFriends(true);
          }
        })
        const about = details.about;
        setAboutMe(about ? about : "");
        setUserDetails(details);
        setInitials(details.fname.slice(0, 1) + details.lname.slice(0, 1));
        setName(details.fname + " " + details.lname)
        setLoading(false);
      }
    }
    getInfo();
  }, [email, router])

  if (loading) {
    return <Loading />
  }

  const handleAddFriend = () => {
    // Friend them
    setIsLoading(true);
    const add = async () => {
      await addConnections({id: searcherId, email: email});
      setFriends(!friends);
      setIsLoading(false);
    }
    add();
  };

  const handleRemoveFriend = () => {
    // Unfriend them
    setIsLoading(true);
    const remove = async () => {
      await removeConnection({id: searcherId, email: email});
      setFriends(!friends);
      setIsLoading(false);
    }
    remove();
  }

  return (
    <>
      <div className="flex flex-col">
        <FullNav />
        <div className="flex justify-center">
          <div className="flex flex-col w-[60%] pt-6">
            <Card className=" bg-secondary w-full">
              <CardHeader className="items-center md:items-start">
                <Avatar className="overflow-hidden h-[150px] w-[150px] bg-border rounded-full sm:h-[200px] sm:w-[200px]">
                  <AvatarImage alt="profile" src="./assets/profile.jpg" className="w-full h-full"/>
                  <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6 justify-between items-center">
                  <div>
                    {name}
                    <br/>
                    Student at {userDetails.uni} - Year {userDetails.grade}
                  </div>

                  {searcherEmail !== email && !friends && <Button onClick={() => handleAddFriend()}>
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Add Friend
                  </Button>}
                  {searcherEmail !== email && friends &&
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button>
                          Remove Friend
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will remove {name} from your friends list.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleRemoveFriend()}>
                            {isLoading && (
                              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  }
                </div>
              </CardContent>
            </Card>
            <AboutMeCard aboutMe={aboutMe} setAboutMe={setAboutMe} isUser={email === searcherEmail}/>
          </div>
        </div>
      </div>
    </>
  )
}

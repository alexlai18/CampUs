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
import { getUser, getUserDetails, getConnections, addConnections, removeConnection, addProfilePic } from '@/api/apiClient';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { Icons } from '@/components/ui/icons';
import { convertToBase64 } from '@/lib/utils';

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
  const [profileLoad, setProfileLoad] = useState(false);
  const [profilePic, setProfilePic] = useState({ myFile: "" })

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

  const handleNewPic = async (e) => {
    e.preventDefault();

    const img = e.target.files[0];
    if (!img) return;
    
    const base64 = await convertToBase64(img);
    setProfilePic({...profilePic, myFile: base64});
    setProfileLoad(true);
    // await addProfilePic(e.target.value);
    setTimeout(function () {
      setProfileLoad(false);
    }, 2000)
  }

  return (
    <>
      <div className="flex flex-col">
        <FullNav />
        <div className="flex justify-center">
          <div className="flex flex-col w-[60%] pt-6">
            <Card className=" bg-secondary w-full">
              <CardHeader className="items-center md:items-start">
                {
                  searcherEmail === email ?
                    <>
                      <label htmlFor="file-upload" className="relative group overflow-hidden h-[150px] w-[150px] bg-border rounded-full sm:h-[200px] sm:w-[200px]">
                        <div className="hidden text-white group-hover:block absolute top-[42%] left-[15%] sm:top-[45%] sm:left-[23%]">Upload Image</div>
                        <div className=" group-hover:opacity-40 h-full w-full cursor-pointer">
                          {
                            profileLoad ?
                            <Icons.spinner className=" text-primary mr-2 h-full w-full animate-spin" /> :
                            <Avatar>
                              <AvatarImage alt="profile" src={profilePic.myFile || "./assets/user.png"} className="w-full h-full"/>
                              <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
                            </Avatar>
                          }
                        </div>
                      </label>
                      <input
                        type="file"
                        label="Image"
                        id="file-upload"
                        accept=".jpeg, .png, .jpg"
                        className="hidden"
                        onChange={handleNewPic}
                      />
                    </> :
                    <div className="relative group overflow-hidden h-[150px] w-[150px] bg-border rounded-full sm:h-[200px] sm:w-[200px]">
                      <Avatar>
                        <AvatarImage alt="profile" src={profilePic.myFile || "./assets/user.png"} className="w-full h-full"/>
                        <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
                      </Avatar>
                    </div>
                }
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

"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from '@/components/ui/icons';

import { FullNav } from '../../components/navigation/FullNav';
import { useDispatch, useSelector } from 'react-redux';
import { getGroup, getUser, getUserDetails } from '@/api/apiClient';
import { setUserDetailState } from '../store/reducers/userDetailState';

export default function GroupsPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [currentGroups, setCurrentGroups] = useState([]);
  const [pastGroups, setPastGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetailState.value);
  const email = useSelector((state) => state.authenticationState.value).email;

  useEffect(() => {
    setIsLoading(true);
    async function grouping() {
      const user = await getUser("email", email);
      if (user && user.details) {
        const currList = [];
        const pastList = [];

        const detailId = user.details[0];
        const details = await getUserDetails(detailId);
        // Non-dependent promises can be ran concurrently
        await Promise.all(
          [
            ...details.currentGroups.map(async (g) => {
              currList.push(await getGroup(g));
            }),
            ...details.pastGroups.map(async (g) => {
              pastList.push(await getGroup(g));
            })
          ]
        )
        setCurrentGroups(currList);
        setPastGroups(pastList);
        dispatch(
          setUserDetailState(details)
        );
      }
      setIsLoading(false);
    }
    grouping();
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    const currGroup = userDetails.currentGroups;
    const pastG = userDetails.pastGroups;

    // Filtering the current groups
    if (currGroup) {
      const currRes = []
      currGroup.map((g) => {
        if ((g.course.toLowerCase()).includes(prefix.toLowerCase()) ||
          (g.name.toLowerCase()).includes(prefix.toLowerCase())) {
          currRes.push(g);
        }
      });
      setCurrentGroups(currRes);
    }

    // Filtering the past groups
    if (pastG) {
      const pastRes = []
      pastG.map((g) => {
        if ((g.course.toLowerCase()).includes(search.toLowerCase()) ||
          (g.name.toLowerCase()).includes(search.toLowerCase())) {
          pastRes.push(g);
        }
      });
      setPastGroups(pastRes);
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <FullNav />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Your Groups</h2>
          </div>
          <form className="flex" onSubmit={handleSubmit}>
            <Input
              type="search"
              placeholder="Filter Your Groups..."
              className="sm:w-[300px]"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button><MagnifyingGlassIcon /></Button>
          </form>
          <h3 className="text-3xl font-bold tracking-tight">Current Groups</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {!isLoading && currentGroups && currentGroups.length > 0 ?
              currentGroups.map((group) => {
                return (
                  <button key={`btn-${group._id}`} onClick={() => router.push(`/groups/${group._id}`)}>
                    <Card key={`group-${group.name}`}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-bold">
                          {group.name}
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
                        <div className="flex flex-row items-center justify-between text-sm font-medium">
                          {/* We will get this information from how many courses they have joined */}
                          This group is for the course {group.courseCode}
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                )
              })
              :
              <div className="text-muted-foreground text-center">
                {isLoading ?
                  <Icons.spinner className="mr-2 h-20 w-20 animate-spin text-primary" /> :
                  "Join groups by joining course chats!"
                }
              </div>
            }
          </div>
          <h3 className="text-3xl font-bold tracking-tight">Past Groups</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {!isLoading && pastGroups && pastGroups.length > 0 ?
              pastGroups.map((group) => {
                return (<Card key={`pastgroup-${group.name}`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">
                      {group.name}
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
                    <div className="text-sm font-medium">
                      {/* We will get this information from how many courses they have joined */}
                      This group is for the course {group.course}
                    </div>
                  </CardContent>
                </Card>)
              })
              :
              <div className="text-muted-foreground text-center">
                {isLoading ?
                  <Icons.spinner className="mr-2 h-20 w-20 animate-spin text-primary" /> :
                  "You have no past groups!"
                }
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

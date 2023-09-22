"use client"

import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FullNav } from "@/components/navigation/FullNav";
import { getCourseGroups, getCourses, getUserById, getUserDetails, joinCourse } from '@/api/apiClient';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Loading } from '@/components/utils/Loading';
import { Icons } from '@/components/ui/icons';

export default function CoursesPage({ params }) {
  const { code } = params;
  const [info, setInfo] = useState({});
  const [search, setSearch] = useState("");
  const [groupList, setGroupList] = useState([]);
  const userAuth = useSelector((state) => state.authenticationState.value);
  const [joined, setJoined] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [buttonLoad, setButtonLoad] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const get = await getCourses(code);
      const user = await getUserById(userAuth.userId);
      const details = await getUserDetails(user.details[0]);
      setInfo(get[0]);
      setJoined(details.currentCourses ? details.currentCourses.includes(get[0]._id) : false);
      setLoading(false);
    }
    load();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setGroupList(await getCourseGroups(info.code, search));
  }

  const handleJoinCourse = async (event) => {
    event.preventDefault();
    setButtonLoad(true);
    if (joined) {
      const leave = await joinCourse(userAuth.userId, code, false);
      if (leave) {setJoined(false)};
    } else {
      const join = await joinCourse(userAuth.userId, code, true);
      if (join) {setJoined(true)};
    }
    setButtonLoad(false);
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div className="hidden flex-col md:flex">
        <FullNav />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{info.code}</h2>
            <div className="flex items-center space-x-2">
            </div>
          </div>
          <h3 className="text-2xl font-bold tracking-tight">This course has {info.perGroup === 1 ? "no group assignments. You can still find study buddies!" : `group assignments consisting of ${info.perGroup}`}</h3>
          <div className="flex flex-row justify-between">
            <form className="flex" onSubmit={handleSubmit}>
              <Input
                type="search"
                placeholder="Search Groups..."
                className="md:w-[100px] lg:w-[300px]"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button><MagnifyingGlassIcon /></Button>
            </form>
            <Button onClick={handleJoinCourse}>{buttonLoad && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}{joined ? "Leave Course" : "Join Course"}</Button>
          </div>
          {groupList.length > 0 ?
            groupList.map((g) => {
              return (
                <button className="w-full" key={`btn-${g._id}`} onClick={() => router.push(`/groups/${g._id}`)}>
                  <Card key={`group-${g.name}`} className="col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-2xl font-bold">
                        {g.name}
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
                    <CardContent className="flex flex-row items-center justify-between space-y-0">
                      <div className="text-sm font-medium">
                        {/* We will get this information from how many courses they have joined */}
                        {
                          g.members ? `This group currently has ${g.members.length} members` : `This group currently has no group members. Be the first to join!`
                        }
                      </div>
                    </CardContent>
                  </Card>
                </button>
              )
            })
            :
            <div className="text-muted-foreground text-center">
              Search for groups that study {info.code}
            </div>
          }
        </div>
      </div>
    </>
  )
}

"use client"

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FullNav } from "@/components/navigation/FullNav";
import { getGroup, getUserById, getUserDetails } from '@/api/apiClient';
import { Separator } from '@/components/ui/separator';
import { Loading } from '@/components/utils/Loading';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';

export default function CoursesPage({ params }) {
  const { id } = params;
  const [info, setInfo] = useState({});
  const [users, setUsers] = useState([]);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const userAuth = useSelector((state) => state.authenticationState.value);
  const targetMap = {
    "PS": "Pass",
    "CR": "Credit",
    "D" : "Distinction",
    "HD": "High Distinction"
  };

  useEffect(() => {
    setLoading(true);
    const load = async () => {
      const get = await getGroup(id);
      setInfo(get);

      const res = [];
      const use = [];
      await Promise.all(
        get.members.map(async (m) => {
          const user = await getUserById(m);
          use.push(user);
          const details = user.details[0];
          res.push(await getUserDetails(details));
        })
      )
      setUserList(res);
      setUsers(use);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="hidden flex-col md:flex">
        <FullNav />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{info.name}</h2>
          </div>
          <div className="flex items-center justify-between space-y-2">
            <h4 className="text-xl font-bold tracking-tight">This group is for the course {info.courseCode}</h4>
            <h4 className="text-xl font-bold tracking-tight text-primary">Group Target: {targetMap[info.target]}</h4>
          </div>
          <Separator className="" />
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Here are the group members:</h2>
            {users.some(function (el) { return el._id == userAuth.userId; }) ? <Button>Leave Group</Button> : <Button>Join Group</Button>}
          </div>
          {userList.length > 0 ?
            userList.map((user) => {
              console.log(user);
              return (
                <button className="w-full" key={`btn-${user._id}`} onClick={() => {router.push(`/profile?email=${user.email}`)}}>
                  <Card key={`connection-${user}`} className="col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-2xl font-bold">
                        {user.fname} {user.lname}
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
                    <CardContent className="flex flex-row items-center justify-between">
                      <div className="text-sm font-medium">
                        {/* We will get this information from how many courses they have joined */}
                        Student at {user.uni}
                      </div>
                    </CardContent>
                  </Card>
                </button>
              )
            })
            :
            <div className="text-muted-foreground text-center">
              There are no group members in this group. Be the first to join!
            </div>
          }
          <div className="flex items-center justify-end space-y-2">
            <Button>Join Chat!</Button>
          </div>
        </div>
      </div>
    </>
  )
}
"use client"

import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FullNav } from '../components/navigation/FullNav';
import { getUsers } from '../mockData';

export default function ConnectionsPage() {
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserList(getUsers(search));
  }

  return (
    <>
      <div className="hidden flex-col md:flex">
        <FullNav />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Connections</h2>
            <div className="flex items-center space-x-2">
            </div>
          </div>
          <form className="flex" onSubmit={handleSubmit}>
            <Input
              type="search"
              placeholder="Search Your Connections..."
              className="md:w-[100px] lg:w-[300px]"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button><MagnifyingGlassIcon /></Button>
          </form>
          {userList.length > 0 ?
            userList.map((user) => {
              return (<Card className="col-span-3">
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
                <CardContent>
                  <div className="text-sm font-medium">
                    {/* We will get this information from how many courses they have joined */}
                    Student at {user.uni}
                  </div>
                </CardContent>
              </Card>)
            })
            :
            <div className="text-muted-foreground text-center">
              Search through your connections, or for new connections!
            </div>
          }
        </div>
      </div>
    </>
  )
}

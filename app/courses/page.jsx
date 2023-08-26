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
import { getCourses } from '../mockData';

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [courseList, setCourseList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(search);
    setCourseList(getCourses(search));
  }

  return (
    <>
      <div className="hidden flex-col md:flex">
        <FullNav />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
            <div className="flex items-center space-x-2">
            </div>
          </div>
          <form className="flex" onSubmit={handleSubmit}>
            <Input
              type="search"
              placeholder="Search Courses..."
              className="md:w-[100px] lg:w-[300px]"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button><MagnifyingGlassIcon /></Button>
          </form>
          {courseList.length > 0 ?
            courseList.map((course) => {
              console.log(course);
              return (<Card className="col-span-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-2xl font-bold">
                    {course.code}
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
                  <div className="text-sm font-medium">
                    {/* We will get this information from how many courses they have joined */}
                    {course.code} has group assignments consisting of {course.perGroup}.
                  </div>
                </CardContent>
              </Card>)
            })
            :
            <div className="text-muted-foreground text-center">
              Search for courses or public groups!
            </div>
          }
        </div>
      </div>
    </>
  )
}

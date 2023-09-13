"use client"

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FullNav } from '../../components/navigation/FullNav';
import { getCourses } from '@/api/apiClient';
import { useRouter } from 'next/navigation';

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [courseList, setCourseList] = useState([]);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCourseList(await getCourses(search));
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
              return (
                <button key={`btn-${course.code}`} className="w-full" onClick={() => {router.push(`/courses/${course.code}`)}}>
                  <Card key={`course-${course.code}`} className="col-span-3">
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
                    <CardContent className="flex flex-row items-center justify-between">
                      <div className="text-sm font-medium">
                        {/* We will get this information from how many courses they have joined */}
                        {course.perGroup > 1 ?
                          `${course.code} has group assignments consisting of ${course.perGroup}` :
                          `${course.code} has no group assignments. You can still find study buddies!`
                        }
                      </div>
                    </CardContent>
                  </Card>
                </button>
              )
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

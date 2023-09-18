"use client"
import React, { useState, useEffect } from "react";
import { FullNav } from "@/components/navigation/FullNav";
import { Loading } from "@/components/utils/Loading";
import { useSearchParams } from "next/navigation";
import { getCourses, getUsers } from "@/api/apiClient";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const val = searchParams.get("val");

  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getInfo = async () => {
      setCourses(await getCourses(val));
      // Function that searches for first name and last name of all users
    }
    getInfo();
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <div className="hidden flex-col md:flex">
      <FullNav />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Search results for&#58; {val}</h2>
        </div>
        <br />
        {courses.length > 0 && <h3 className="text-3xl font-bold tracking-tight">Courses</h3>}
        {courses.length > 0 &&
          courses.map((course) => {
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
        }
      </div>
    </div>
  );
}

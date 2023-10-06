"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import { DashboardSkeleton } from "../skeletons/DashboardSkeleton";

export function CurrentLoadCard(props) {
  const { details, loading } = props;

  return (
    <>
      {
        loading ?
          <DashboardSkeleton />
        :
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Load
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
              <div className="text-2xl font-bold">
                {/* We will get this information from how many courses they have joined */}
                {details && details.currentCourses ? details.currentCourses.length : "No"} Courses
              </div>
              <p className="text-xs text-muted-foreground">
                {details && details.currentCourses && details.pastCourses ? details.currentCourses.length + details.pastCourses.length : "No"} Courses Enrolled All-Time
              </p>
            </CardContent>
          </Card>
      }
    </>
  )
}
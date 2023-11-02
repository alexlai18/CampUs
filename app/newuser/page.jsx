"use client"

import { useSearchParams } from 'next/navigation'
import { NewUserForm } from '../../components/forms/NewUserForm';

export default function NewUser() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  return (
    <>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">CampUs: A smarter way to find group partners</h2>
          </div>
        </div>
      </div>
      <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to CampUs!
              </h1>
              <p className="text-sm text-muted-foreground">
                We just have a few questions before you can start
              </p>
            </div>
            <NewUserForm email={email}/>
            <p className="px-8 text-center text-sm text-muted-foreground">
              Don&apos;t worry, you can change all of this information later
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
"use client"

import { FullNav } from '@/components/navigation/FullNav'
import { NewGroupForm } from '@/components/forms/NewGroupForm'

export default function NewGroup() {
  return (
    <>
      <div className="flex flex-col">
        <FullNav />
      </div>
      <div className="p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create a new group
            </h1>
            <p className="text-sm text-muted-foreground">
              Connect your future crew!
            </p>
          </div>
          <NewGroupForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Don&apos;t worry, you can change these answers later in the settings.
          </p>
        </div>
      </div>
    </>
  )
}
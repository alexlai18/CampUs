"use client"
import { MainNav } from "./MainNav"
import { SearchBar } from "./SearchBar"
import { ProfileNav } from "./ProfileNav"

export function FullNav() {
  return (
    <div className="flex flex-col">
      <div className="border-b">
        <div className="flex h-32 justify-center px-4 space-y-4 flex-col align-middle sm:max-2xl:flex-row sm:max-2xl:h-16 sm:max-2xl:space-y-0">
          <MainNav className="mx-6" />
          <div className="ml-4 sm:max-2xl:ml-auto flex items-center space-x-4">
            <SearchBar />
            <ProfileNav />
          </div>
        </div>
      </div>
    </div>
  )
}
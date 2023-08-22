"use client"
import { MainNav } from "./MainNav"
import { SearchBar } from "./SearchBar"
import { ProfileNav } from "./ProfileNav"

export function FullNav() {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <SearchBar />
            <ProfileNav />
          </div>
        </div>
      </div>
    </div>
  )
}
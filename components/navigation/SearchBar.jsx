"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";

export function SearchBar() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/search?val=${search}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="search"
          placeholder="Search..."
          className="md:w-[100px] lg:w-[300px]"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  )
}
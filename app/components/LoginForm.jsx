"use client"

import React, { useState } from "react"

// ShadCN UI components
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'

// Self-made components
import { ErrorPopup } from "./ErrorPopup"
// User functions
import { logUser } from "../mockData"


export function LoginForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    // Submit function
    //submit(email, password);
    setIsLoading(true)
    if(!logUser(email, password)) {
      setTimeout(() => {
        setIsLoading(false)
      }, 3000);
      setError(true);
    } else{
      setTimeout(() => {
        setIsLoading(false)
        router.push("/dashboard")
      }, 3000);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="py-2">
            {error && 
              <ErrorPopup
                severity={true}
                message="This user does not have an account. Please register."
              />
            }
        </div>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="login-email">
              Email
            </Label>
            <Input
              id="login-email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="login-password">
              Password
            </Label>
            <Input
              id="login-password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <Button variant="outline" type="button" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          Github
        </Button>
        <Button variant="outline" type="button" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
      </div>
    </div>
  )
}
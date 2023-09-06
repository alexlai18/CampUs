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
import { ErrorPopup } from "../utils/ErrorPopup"
// User functions
import { setAuthenticationState } from "@/app/store/reducers/authenticationState"
import { useDispatch } from "react-redux"
import { logUser, getUserDetails } from "@/api/apiClient"
import { setUserDetailState } from "@/app/store/reducers/userDetailState"


export function LoginForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const res = await logUser(email, password);

    if(res.length === 0) {
      setError(true);
    } else {
      dispatch(
        setAuthenticationState({
          email: email,
          userId: res._id
        })
      );
      if (!res.details) {
        router.push(`/newuser/?email=${email}`);
        return;
      }

      const details = await getUserDetails(res.details[0]);

      if (!details) {
        router.push(`/newuser/?email=${email}`);
      } else {
        dispatch(
          setUserDetailState(details)
        );
        router.push("/dashboard");
      }
    }
    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="py-2">
            {error && 
              <ErrorPopup
                severity={true}
                message="The email or password was incorrect. Please check again or register!"
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
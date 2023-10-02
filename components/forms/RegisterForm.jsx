"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

// ShadCN UI Components
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ErrorPopup } from "../utils/ErrorPopup"
import { createUser } from "@/api/apiClient"
import { useDispatch } from "react-redux"
import { setAuthenticationState } from "@/app/store/reducers/authenticationState"

export function RegisterForm() {
  const router = useRouter(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    const user = await createUser({
      email: email,
      password: password,
    });

    if (!user) {
      setError(true);
    } else {
      dispatch(
        setAuthenticationState({
          email: user.email,
          userId: user._id
        })
      );
      router.push(`/newuser/?email=${email}`);
    }
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
      )}
    >
      <Card>
        <CardHeader className="space-y-1">
          <div className="py-2">
            {error && 
              <ErrorPopup
                severity={true}
                message="This email already has a registered user. Please log in."
              />
            }
          </div>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline">
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
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
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" onChange={(e) => {setPassword(e.target.value)}} required />
              </div>
              <div className="pt-6">
                <Button className="w-full">Create account</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
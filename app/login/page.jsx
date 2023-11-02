"use client"

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LoginForm } from '../../components/forms/LoginForm'
import { useRouter } from 'next/navigation';

export default function Login() {
  const email = useSelector((state) => state.authenticationState.value).email;
  const router = useRouter();

  useEffect(() => {
    if (email !== undefined) {
      router.push('/dashboard');
    }
  }, []);

  return (
    <>
      <div className="flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">CampUs: A smarter way to find group partners</h2>
            <div className="flex items-center space-x-2 px-8">
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col p-10 text-foreground dark:border-r lg:flex">
          <div className="absolute inset-0 dark:bg-zinc-900 bg-primary" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            CampUs
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This website has saved me countless hours of searching and helped me find a group member that suited my workstyle.&rdquo;
              </p>
              <footer className="text-sm">Alexander Lai</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to sign in.
              </p>
            </div>
            <LoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              If you do not have an account please {" "}
              <Link
                href="/register"
                className="underline underline-offset-4 hover:text-primary"
              >
                register
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
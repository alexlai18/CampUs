"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useSelector } from 'react-redux';
import { Loading } from "./utils/Loading";

export const PrivateRoute = (props) => {
  const userAuth = useSelector((state) => state.authenticationState.value);
  const { email } = userAuth;
  const router = useRouter();
  const unAuth = ['/', '/login', 'register'];
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      if (email === undefined && !(window.location.pathname in unAuth)) {
        router.push('/');
      }
    })
  }, [])

  if (isPending) {
    return <Loading />
  } else {
    return props.children;
  }
}
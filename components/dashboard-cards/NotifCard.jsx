
import { getUserDetails, getUser } from "@/api/apiClient";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Icons } from "@/components/ui/icons";


export function NotifCard(props) {
  const { notif } = props;
  const [info, setInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    async function getInfo() {
      const user = await getUser("email", notif.sender);
      if (user && user.details) {
        const detailId = user.details[0];
        const details = await getUserDetails(detailId);
        setInfo(details)
        setIsLoading(false);
      } 
    }
    getInfo();
  }, [])

  const findNotif = (params, info) => {
    switch (params.action) {
      case "messaged":
        return (
          <p className="text-sm text-muted-foreground">
            {`${info.fname} ${info.lname} ${params.action}: ${params.message}`}
          </p>
        )
      case "reacted":
        return (
          <p className="text-sm text-muted-foreground">
            {`${info.fname} ${info.lname} ${params.action} to your message`}
          </p>
        )
      case "bumped":
        return (
          <p className="text-sm text-muted-foreground">
            {`${info.fname} ${info.lname} ${params.action} their message: ${params.message}`}
          </p>
        )
      default:
        return (
          <p className="text-sm text-muted-foreground">
            {`Notification from ${info.fname} ${info.lname}`}
          </p>
        )
    }
  }

  if (isLoading) {
    return (
      <Card className="rounded-full">
        <Icons.spinner className="mr-2 h-8 w-8 animate-spin text-primary" />
      </Card>
    )
  }

  return (
    <Card className="rounded-full">
      <div className="flex items-center" key={`notif-${notif.sender}`}>
        <Avatar className="h-9 w-9 ml-4">
          <AvatarImage alt="Avatar" />
          <AvatarFallback className="bg-primary text-primary-foreground">{info.fname.slice(0, 1) + info.lname.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="ml-4 mt-2 space-y-1 mb-2 mr-4">
          <p className="text-sm font-medium">{info.fname} {info.lname}</p>
          {findNotif(notif, info)}
        </div>
      </div>
    </Card>
  );
}

import { getUserDetails } from "@/app/mockData";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { Card } from "@/components/ui/card";

export function NotifCard(props) {
  const { notif } = props;
  const info = getUserDetails(notif.sender);
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

  return (
    <Card className="rounded-full">
      <div className="flex items-center" key={`notif-${notif.email}`}>
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
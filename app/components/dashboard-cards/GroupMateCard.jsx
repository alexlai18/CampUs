import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function GroupMateCard(props) {
  const { favGroupMates, userDetails } = props;

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Favourite Groupmates</CardTitle>
        <CardDescription>
          These are {userDetails.fname}'s top groupmates.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {favGroupMates.length > 1 ? favGroupMates.map((mate) => {
            return(
              <div className="flex items-center" key={`groupmate-${mate.email}`}>
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>{mate.initials}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{mate.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {mate.email}
                  </p>
                </div>
                <div className="ml-auto font-medium">{mate.course}</div>
              </div>
            )
          }) : <div className='text-lg font-medium'>You have not had any past groupmates. Connect through groups!</div>}
        </div>
      </CardContent>
    </Card>
  );
}
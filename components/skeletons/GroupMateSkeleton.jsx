import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
  
export function GroupMateSkeleton() {
  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-1 pb-2">
        <Skeleton className="h-3 w-[50%]" />
      </CardHeader>
      <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-6 w-[80%]" />
            <Skeleton className="h-2 w-[80%]" />
          </div>
      </CardContent>
    </Card>
  )
}
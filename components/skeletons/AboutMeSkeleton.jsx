import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
  
export function AboutMeSkeleton() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between space-y-2">
          <Skeleton className="h-3 w-[50%]" />
        </div>
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
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "@/components/ui/separator"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react"

export function ChatSkeleton() {
  return (
    <Card className="h-[800px] relative">
      <CardHeader className="flex flex-col items-left pb-0">
        <Skeleton className="h-7 w-[20%]" />
        <Skeleton className="h-4 w-[18%]" />
      </CardHeader>
      <Separator className="my-6 mb-4" />
      <CardContent className="h-[600px]">
        <div className="space-y-4 h-[50px]">
          <div className="flex items-center space-x-4">
            <div className="flex-col space-y-1 ml-auto">
              <Skeleton className="gap-2 rounded-lg px-3 py-2 h-4 w-[40%] ml-auto" />
              <Skeleton className="gap-2 rounded-lg px-3 py-2 h-4 w-[200px] ml-auto" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-col space-y-1">
              <Skeleton className="gap-2 rounded-lg px-3 py-2 h-4 w-[40%]" />
              <Skeleton className="gap-2 rounded-lg px-3 py-2 h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-col space-y-1 ml-auto">
              <Skeleton className="gap-2 rounded-lg px-3 py-2 h-4 w-[40%] ml-auto" />
              <Skeleton className="gap-2 rounded-lg px-3 py-2 h-4 w-[200px] ml-auto" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-col space-y-1">
              <Skeleton className="gap-2 rounded-lg px-3 py-2 h-4 w-[40%]" />
              <Skeleton className="gap-2 rounded-lg px-3 py-2 h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="absolute bottom-0 w-full">
        <form
          className="flex w-full items-center space-x-2"
        >
          <Input
            id="message"
            placeholder="Loading Messages..."
            className="flex-1"
            autoComplete="off"
          />
          <Button type="submit" size="icon" disabled={true}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

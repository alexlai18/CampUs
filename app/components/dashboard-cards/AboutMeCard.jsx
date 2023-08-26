import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';

export function AboutMeCard(props) {
  const { aboutMe, handleEdit } = props;
  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between space-y-2">
          <CardTitle>About You</CardTitle>
          <Button onClick={handleEdit}>Edit</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-l">
          {aboutMe}
        </div>
      </CardContent>
    </Card>
  )
}
import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { setNewAbout } from "@/app/mockData";

export function AboutMeCard(props) {
  const { aboutMe, setAboutMe } = props;
  const [newInfo, setNewInfo] = useState(aboutMe);
  const [onEdit, setOnEdit] = useState(false);

  const handleEdit = () => {
    setOnEdit(!onEdit);
  }

  const handleSubmit = () => {
    if (setNewAbout(sessionStorage.getItem("email"), newInfo)) {
      setAboutMe(newInfo);
      setOnEdit(false);
    }
  }

  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between space-y-2">
          <CardTitle>About You</CardTitle>
          <Button onClick={handleEdit}>Edit</Button>
        </div>
      </CardHeader>
      <CardContent>
        {
          !onEdit && (
            <div>
              {aboutMe.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          )
        }
        <div className="space-y-2">
          {
            onEdit && (
              <Textarea
                placeholder="Write something about yourself"
                onChange={(e) => {
                  setNewInfo(e.target.value)
                }}
                defaultValue={aboutMe}
              />
            )
          }
          <div className="flex justify-end">
            {onEdit && (
              <Button onClick={handleSubmit}>Submit Changes</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
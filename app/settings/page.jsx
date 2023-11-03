"use client"
import { useEffect, useState } from "react";
import { ProfileSettingsForm } from "../../components/forms/ProfileSettingsForm";
import { getLanguages } from "@/api/getLanguages";

export default function SettingsPage() {

  const [languages, setLanguages] = useState([]);

  useEffect(async () => {
    setLanguages(await getLanguages())
  });
  return (
    <div className="flex flex-col">
      <ProfileSettingsForm />
    </div>
  )
}
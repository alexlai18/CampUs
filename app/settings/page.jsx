import { Separator } from "@/components/ui/separator";
import { FullNav } from "../components/navigation/FullNav";
import { ProfileSettingsForm } from "../components/forms/ProfileSettingsForm";

export default function SettingsPage() {
  return (
    <div className="hidden flex-col md:flex">
      <FullNav />
        <div className="hidden space-y-6 p-10 pb-16 md:block">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <Separator />
          <ProfileSettingsForm />
      </div>
    </div>
  )
}
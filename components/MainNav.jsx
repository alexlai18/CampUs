import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/courses"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Courses
      </Link>
      <Link
        href="/connections"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Connections
      </Link>
      <Link
        href="/groups"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Groups
      </Link>
      <Link
        href="/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  )
}
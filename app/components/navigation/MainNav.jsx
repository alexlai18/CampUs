import Link from "next/link"

import { cn } from "@/lib/utils"
import { usePathname} from "next/navigation"

export function MainNav({
  className,
  ...props
}) {
  const pathname = usePathname()
  console.log(pathname);
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className={`text-sm font-medium ${pathname === "/dashboard" ? "" : "text-muted-foreground"} transition-colors hover:text-primary`}
      >
        Dashboard
      </Link>
      <Link
        href="/courses"
        className={`text-sm font-medium ${pathname === "/courses" ? "" : "text-muted-foreground"} transition-colors hover:text-primary`}
      >
        Courses
      </Link>
      <Link
        href="/connections"
        className={`text-sm font-medium ${pathname === "/connections" ? "" : "text-muted-foreground"} transition-colors hover:text-primary`}
      >
        Connections
      </Link>
      <Link
        href="/groups"
        className={`text-sm font-medium ${pathname === "/groups" ? "" : "text-muted-foreground"} transition-colors hover:text-primary`}
      >
        My Groups
      </Link>
      <Link
        href="/settings"
        className={`text-sm font-medium ${pathname === "/settings" ? "" : "text-muted-foreground"} transition-colors hover:text-primary`}
      >
        Settings
      </Link>
    </nav>
  )
}
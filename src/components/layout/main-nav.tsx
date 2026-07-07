import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

type MainNavProps = {
  className?: string
}

const navLinkClassName =
  "h-auto cursor-pointer rounded-md bg-transparent px-3 py-2 text-[13px] font-normal tracking-wide text-muted-foreground shadow-none transition-colors duration-200 hover:bg-accent/50 hover:text-foreground focus:bg-accent/50 focus:text-foreground data-open:bg-accent/50 data-open:hover:bg-accent/50 data-open:hover:text-foreground"

export function MainNav({ className }: MainNavProps) {
  return (
    <NavigationMenu viewport={false} className={cn("max-w-none", className)}>
      <NavigationMenuList className="gap-1">
        {siteConfig.mainNav.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className={cn(navigationMenuTriggerStyle(), navLinkClassName)}
              >
                {item.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

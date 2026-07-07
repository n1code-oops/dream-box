"use client"

import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { siteConfig } from "@/config/site"

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer text-muted-foreground transition-colors duration-200 hover:bg-accent/50 hover:text-foreground"
          aria-label="打开菜单"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 border-border/50">
        <SheetHeader>
          <SheetTitle className="font-heading tracking-tight">
            {siteConfig.name}
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1">
          {siteConfig.mainNav.map((item) => (
            <SheetClose key={item.href} asChild>
              <Link
                href={item.href}
                className="cursor-pointer rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-accent/50 hover:text-foreground"
              >
                {item.title}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

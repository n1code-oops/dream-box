import Link from "next/link"
import { BoxIcon } from "lucide-react"

import { PageContainer } from "@/components/layout/page-container"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { siteConfig } from "@/config/site"

import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"

export function Header() {
  return (
    <header className="surface-glass shadow-header sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur-xl">
      <PageContainer>
        <div className="relative flex h-16 items-center before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-foreground/10 before:to-transparent">
          <Link
            href="/"
            className="group mr-10 flex cursor-pointer items-center gap-3 font-heading transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 transition-colors duration-200 group-hover:border-primary/40 group-hover:bg-primary/15">
              <BoxIcon className="size-4 text-primary" aria-hidden />
            </span>
            <span className="text-base font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
              {siteConfig.name}
            </span>
          </Link>

          <div
            className="mr-8 hidden h-6 w-px shrink-0 bg-border md:block"
            aria-hidden
          />

          <MainNav className="hidden md:flex" />

          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </PageContainer>
    </header>
  )
}

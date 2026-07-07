import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { NavCategory } from "@/config/navigation"

type NavCategoryCardProps = {
  category: NavCategory
}

export function NavCategoryCard({ category }: NavCategoryCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{category.title}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-1">
        {category.items.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex cursor-pointer items-start gap-3 rounded-md border border-transparent p-3 transition-colors duration-200 hover:border-border hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 transition-colors duration-200 group-hover:border-primary/35 group-hover:bg-primary/15">
                <Icon className="size-4 text-primary" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  {item.title}
                  <ArrowUpRightIcon
                    className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    aria-hidden
                  />
                </span>
                <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </span>
              </span>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}

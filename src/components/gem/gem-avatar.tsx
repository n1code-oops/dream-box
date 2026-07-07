import Image from "next/image"
import { SparklesIcon } from "lucide-react"

import type { GemType } from "@/config/gem"
import { cn } from "@/lib/utils"

const sizeClasses = {
  sm: "size-5",
  md: "size-8",
  lg: "size-12 rounded-md border-2 p-1",
} as const

type GemAvatarProps = {
  gem: Pick<GemType, "name" | "image" | "useIconPlaceholder">
  size?: keyof typeof sizeClasses
  className?: string
}

export function GemAvatar({
  gem,
  size = "md",
  className,
}: GemAvatarProps) {
  if (gem.useIconPlaceholder || !gem.image) {
    return (
      <span
        aria-hidden
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/50 text-muted-foreground",
          sizeClasses[size],
          className
        )}
      >
        <SparklesIcon
          className={cn(
            size === "sm" && "size-3",
            size === "md" && "size-4",
            size === "lg" && "size-6"
          )}
        />
      </span>
    )
  }

  const dimension = size === "sm" ? 20 : size === "md" ? 32 : 48

  return (
    <Image
      src={gem.image}
      alt={gem.name}
      width={dimension}
      height={dimension}
      aria-hidden={size !== "md"}
      className={cn("shrink-0 object-contain", sizeClasses[size], className)}
    />
  )
}

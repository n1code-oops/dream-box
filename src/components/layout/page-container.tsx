import { cn } from "@/lib/utils"

type PageContainerProps = {
  className?: string
  children: React.ReactNode
}

export function PageContainer({ className, children }: PageContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-4", className)}>
      {children}
    </div>
  )
}

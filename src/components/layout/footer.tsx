import { PageContainer } from "@/components/layout/page-container"
import { siteConfig } from "@/config/site"

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50">
      <PageContainer>
        <div className="flex h-14 items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </PageContainer>
    </footer>
  )
}

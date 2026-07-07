export type NavItem = {
  title: string
  href: string
}

export const siteConfig = {
  name: "Dream Box",
  description: "资产计算与提醒管理工具",
  mainNav: [
    { title: "首页", href: "/" },
    { title: "资产计算器", href: "/assets" },
    { title: "提醒事项", href: "/reminders" },
  ] satisfies NavItem[],
} as const

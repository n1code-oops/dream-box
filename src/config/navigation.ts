import type { LucideIcon } from "lucide-react"
import {
  BellRing,
  Calculator,
  CalendarClock,
  ChartLine,
  Gem,
  Landmark,
  PieChart,
  PiggyBank,
  Repeat,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react"

export type NavLinkItem = {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export type NavCategory = {
  title: string
  description: string
  items: NavLinkItem[]
}

export const navCategories: NavCategory[] = [
  {
    title: "资产管理",
    description: "计算、追踪与规划你的资产",
    items: [
      {
        title: "资产计算器",
        description: "快速估算总资产与分布结构",
        href: "/assets",
        icon: Calculator,
      },
      {
        title: "投资组合",
        description: "查看持仓占比与资产配置",
        href: "/assets/portfolio",
        icon: PieChart,
      },
      {
        title: "复利计算",
        description: "模拟长期收益与增长曲线",
        href: "/assets/compound",
        icon: TrendingUp,
      },
    ],
  },
  {
    title: "提醒事项",
    description: "不错过任何重要时间节点",
    items: [
      {
        title: "到期提醒",
        description: "理财、账单与合约到期通知",
        href: "/reminders",
        icon: BellRing,
      },
      {
        title: "定期任务",
        description: "按月或按周的重复提醒",
        href: "/reminders/recurring",
        icon: Repeat,
      },
      {
        title: "重要节点",
        description: "目标进度与里程碑追踪",
        href: "/reminders/milestones",
        icon: Target,
      },
    ],
  },
  {
    title: "数据概览",
    description: "从全局视角理解资产变化",
    items: [
      {
        title: "资产总览",
        description: "汇总净资产与现金流概况",
        href: "/reports/overview",
        icon: Wallet,
      },
      {
        title: "趋势分析",
        description: "查看资产随时间的波动趋势",
        href: "/reports/trends",
        icon: ChartLine,
      },
      {
        title: "储蓄计划",
        description: "设定目标并跟踪完成进度",
        href: "/reports/savings",
        icon: PiggyBank,
      },
    ],
  },
  {
    title: "常用工具",
    description: "日常理财辅助小工具",
    items: [
      {
        title: "汇率换算",
        description: "多币种资产实时换算",
        href: "/tools/exchange",
        icon: Landmark,
      },
      {
        title: "日程规划",
        description: "将财务节点同步到日历",
        href: "/tools/calendar",
        icon: CalendarClock,
      },
      {
        title: "宝石合成计算器",
        description: "计算宝石逐级合成的资源花费",
        href: "/gem",
        icon: Gem,
      },
    ],
  },
]

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "宝石合成计算器",
}

export default function GemLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="py-10 md:py-14">
      <section className="mb-8 flex max-w-2xl flex-col gap-3">
        <h1 className="text-3xl font-semibold md:text-4xl">
          <span className="text-primary">宝石合成</span>计算器
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          选择宝石类型，查看每一级合成的宝石数量与金币花费。
        </p>
      </section>

      {children}
    </div>
  )
}

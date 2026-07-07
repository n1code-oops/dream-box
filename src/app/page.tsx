import { navCategories } from "@/config/navigation"

import { NavCategoryCard } from "@/components/home/nav-category-card"

export default function HomePage() {
  return (
    <div className="py-12 md:py-16">
      <section className="mb-10 flex max-w-2xl flex-col gap-4">
        <p className="text-sm font-medium tracking-widest text-primary uppercase">
          导航
        </p>
        <h1 className="text-3xl font-semibold md:text-4xl">
          探索 <span className="text-primary">Dream Box</span>
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          按分类浏览功能模块，快速进入所需工具。
        </p>
      </section>

      <section
        aria-label="功能导航"
        className="grid gap-5 sm:grid-cols-2 sm:gap-6"
      >
        {navCategories.map((category) => (
          <NavCategoryCard key={category.title} category={category} />
        ))}
      </section>
    </div>
  )
}

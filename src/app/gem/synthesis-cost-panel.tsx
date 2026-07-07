"use client"

import { useEffect, useState } from "react"

import { GemAvatar } from "@/components/gem/gem-avatar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  buildLevelCostRows,
  formatExtraRequirements,
  formatWan,
  getMaxGemLevel,
  type GemType,
} from "@/config/gem"
import { cn } from "@/lib/utils"

type SynthesisCostPanelProps = {
  gem: GemType
  unitPriceInWan: number
}

export function SynthesisCostPanel({
  gem,
  unitPriceInWan,
}: SynthesisCostPanelProps) {
  const maxLevel = getMaxGemLevel(gem.id)
  const [selectedLevel, setSelectedLevel] = useState(maxLevel)

  const rows = buildLevelCostRows(gem.id, unitPriceInWan)
  const selectedRow =
    rows.find((row) => row.level === selectedLevel) ?? rows.at(-1)

  useEffect(() => {
    setSelectedLevel(getMaxGemLevel(gem.id))
  }, [gem.id])

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
        <div className="flex flex-col gap-1.5">
          <CardTitle>合成花费明细</CardTitle>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
          <GemAvatar gem={gem} size="md" />
          <div className="text-right">
            <p className="text-xs text-muted-foreground">当前选择</p>
            <p className="font-heading text-sm font-semibold">{gem.name}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="max-h-[560px] overflow-auto rounded-lg border border-border/60">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="sticky top-0 z-10 bg-muted/95 backdrop-blur-sm">
              <tr className="border-b border-border/60 text-left">
                <th className="px-4 py-3 font-medium text-muted-foreground">
                  合成等级
                </th>
                <th className="px-4 py-3 font-medium text-muted-foreground">
                  累计 1 级宝石
                </th>
                <th className="px-4 py-3 font-medium text-muted-foreground">
                  额外提交
                </th>
                <th className="px-4 py-3 font-medium text-muted-foreground">
                  累计总花费（万）
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const isSelected = row.level === selectedLevel
                const extraLabel = formatExtraRequirements(row.extraRequirements)

                return (
                  <tr
                    key={row.level}
                    tabIndex={0}
                    aria-selected={isSelected}
                    onClick={() => setSelectedLevel(row.level)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        setSelectedLevel(row.level)
                      }
                    }}
                    className={cn(
                      "cursor-pointer border-b border-border/40 transition-colors duration-200 last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                      isSelected
                        ? "bg-primary/10 hover:bg-primary/15"
                        : "hover:bg-accent/30"
                    )}
                  >
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "font-medium",
                          isSelected ? "text-primary" : "text-foreground"
                        )}
                      >
                        Lv.{row.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">
                      {row.cumulativeLowerGems.toLocaleString("zh-CN")}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {extraLabel ?? "—"}
                    </td>
                    <td className="px-4 py-3 font-mono text-primary">
                      {formatWan(row.cumulativeTotalInWan)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {selectedRow && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">
                合成至 Lv.{selectedRow.level} 所需 1 级宝石
              </p>
              <p className="mt-1 font-mono text-2xl font-semibold tracking-tight text-foreground">
                {selectedRow.cumulativeLowerGems.toLocaleString("zh-CN")}
              </p>
              {selectedRow.extraLowerGems > 0 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  基础 {selectedRow.baseLowerGems.toLocaleString("zh-CN")}
                  {" + "}
                  额外 {selectedRow.extraLowerGems.toLocaleString("zh-CN")}
                </p>
              )}
            </div>
            {selectedRow.extraRequirements && (
              <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground">
                  Lv.{selectedRow.level} 额外提交
                </p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-foreground">
                  {formatExtraRequirements(selectedRow.extraRequirements)}
                </p>
              </div>
            )}
            <div
              className={cn(
                "rounded-lg border border-primary/25 bg-primary/10 p-4",
                !selectedRow.extraRequirements && "sm:col-span-1 lg:col-span-2"
              )}
            >
              <p className="text-xs text-muted-foreground">
                合成至 Lv.{selectedRow.level} 累计总花费
              </p>
              <p className="mt-1 font-mono text-2xl font-semibold tracking-tight text-primary">
                {formatWan(selectedRow.cumulativeTotalInWan)}{" "}
                <span className="text-base font-medium text-muted-foreground">
                  万
                </span>
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

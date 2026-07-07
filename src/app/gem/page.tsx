"use client"

import { useEffect, useState } from "react"

import { GemAvatar } from "@/components/gem/gem-avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { gemTypes, getInitialUnitPrices } from "@/config/gem"
import { loadStoredGemPrices } from "@/lib/gem-prices-storage"
import { cn } from "@/lib/utils"

import { GemPriceDialog } from "./gem-price-dialog"
import { SynthesisCostPanel } from "./synthesis-cost-panel"

export default function GemPage() {
  const [selectedId, setSelectedId] = useState(gemTypes[0]?.id ?? "")
  const [unitPrices, setUnitPrices] = useState(getInitialUnitPrices)

  useEffect(() => {
    const stored = loadStoredGemPrices()
    if (!stored) {
      return
    }
    setUnitPrices((prev) => ({ ...prev, ...stored }))
  }, [])

  const selectedGem =
    gemTypes.find((gem) => gem.id === selectedId) ?? gemTypes[0]

  if (!selectedGem) {
    return null
  }

  const updateUnitPrice = (gemId: string, value: string) => {
    const parsed = value === "" ? 0 : Number.parseFloat(value)
    setUnitPrices((prev) => ({
      ...prev,
      [gemId]: Number.isFinite(parsed) && parsed >= 0 ? parsed : 0,
    }))
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
          <div className="flex flex-col gap-1.5">
            <CardTitle>宝石选择</CardTitle>
            <CardDescription>
              选择宝石类型，点击右上角设置单价后查看合成花费
            </CardDescription>
          </div>
          <GemPriceDialog
            selectedId={selectedGem.id}
            unitPrices={unitPrices}
            onPriceChange={updateUnitPrice}
          />
        </CardHeader>
        <CardContent>
          <div
            role="listbox"
            aria-label="宝石类型"
            className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9"
          >
            {gemTypes.map((gem) => {
              const isSelected = gem.id === selectedGem.id

              return (
                <div
                  key={gem.id}
                  role="option"
                  aria-selected={isSelected}
                  aria-label={gem.name}
                  tabIndex={0}
                  onClick={() => setSelectedId(gem.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      setSelectedId(gem.id)
                    }
                  }}
                  className="flex cursor-pointer flex-col items-center gap-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                >
                  <GemAvatar
                    gem={gem}
                    size="lg"
                    className={cn(
                      "transition-colors duration-200",
                      isSelected
                        ? "border-primary bg-primary/10 opacity-100"
                        : "border-transparent hover:border-border/60 hover:opacity-100"
                    )}
                  />
                  <span
                    className={cn(
                      "text-center text-xs transition-colors duration-200",
                      isSelected
                        ? "font-medium text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {gem.name}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <SynthesisCostPanel
        gem={selectedGem}
        unitPriceInWan={unitPrices[selectedGem.id] ?? 0}
      />
    </div>
  )
}

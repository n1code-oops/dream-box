"use client"

import { Settings2Icon } from "lucide-react"
import { useCallback, useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  clearStoredGemPrices,
  hasStoredGemPrices,
  saveGemPrices,
} from "@/lib/gem-prices-storage"

import { GemPriceFields } from "./gem-price-fields"

type GemPriceDialogProps = {
  selectedId: string
  unitPrices: Record<string, number>
  onPriceChange: (gemId: string, value: string) => void
}

export function GemPriceDialog({
  selectedId,
  unitPrices,
  onPriceChange,
}: GemPriceDialogProps) {
  const [open, setOpen] = useState(false)
  const [savePrices, setSavePrices] = useState(false)

  const focusSelectedInput = useCallback(() => {
    const input = document.getElementById(`gem-price-${selectedId}`)
    if (!(input instanceof HTMLInputElement)) {
      return
    }

    input.focus()
    input.scrollIntoView({ block: "nearest" })
  }, [selectedId])

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setSavePrices(hasStoredGemPrices())
    }
    setOpen(nextOpen)
  }

  const handleComplete = () => {
    if (savePrices) {
      saveGemPrices(unitPrices)
    } else if (hasStoredGemPrices()) {
      clearStoredGemPrices()
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 cursor-pointer gap-1.5"
        >
          <Settings2Icon className="size-3.5" aria-hidden />
          设置价格
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[85vh] overflow-y-auto sm:max-w-3xl"
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          requestAnimationFrame(focusSelectedInput)
        }}
      >
        <DialogHeader>
          <DialogTitle>设置宝石单价</DialogTitle>
          <DialogDescription>
            填写各宝石 1 级单价，单位为万（1 万 = 10,000 金币）
          </DialogDescription>
        </DialogHeader>

        <GemPriceFields
          selectedId={selectedId}
          unitPrices={unitPrices}
          onPriceChange={onPriceChange}
        />

        <FieldGroup className="gap-3">
          <Field orientation="horizontal">
            <Checkbox
              id="save-gem-prices"
              checked={savePrices}
              onCheckedChange={(checked) => setSavePrices(checked === true)}
              className="cursor-pointer"
            />
            <FieldLabel htmlFor="save-gem-prices" className="cursor-pointer">
              保存价格
            </FieldLabel>
          </Field>
        </FieldGroup>

        <DialogFooter>
          <Button className="cursor-pointer" onClick={handleComplete}>
            完成
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

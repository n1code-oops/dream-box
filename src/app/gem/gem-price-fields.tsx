import { GemAvatar } from "@/components/gem/gem-avatar"
import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { gemTypes } from "@/config/gem"
import { cn } from "@/lib/utils"

type GemPriceFieldsProps = {
  selectedId: string
  unitPrices: Record<string, number>
  onPriceChange: (gemId: string, value: string) => void
}

export function GemPriceFields({
  selectedId,
  unitPrices,
  onPriceChange,
}: GemPriceFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {gemTypes.map((gem) => {
        const unitPrice = unitPrices[gem.id] ?? 0

        return (
          <Field
            key={gem.id}
            className={cn(
              "rounded-lg border border-transparent p-3 transition-colors duration-200"
            )}
          >
            <FieldLabel
              htmlFor={`gem-price-${gem.id}`}
              className="flex items-center gap-2 text-xs font-medium"
            >
              <GemAvatar gem={gem} size="sm" />
              {gem.name}
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id={`gem-price-${gem.id}`}
                type="number"
                min={0}
                step={0.1}
                inputMode="decimal"
                placeholder="0"
                value={unitPrice === 0 ? "" : unitPrice}
                aria-label={`${gem.name}单价`}
                className="font-mono"
                onChange={(event) => onPriceChange(gem.id, event.target.value)}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>万</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        )
      })}
    </div>
  )
}

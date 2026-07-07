import { gemTypes } from "@/config/gem"

const GEM_PRICES_STORAGE_KEY = "dream-box:gem-unit-prices"

const validGemIds = new Set(gemTypes.map((gem) => gem.id))

function parseStoredPrices(raw: string): Record<string, number> | null {
  try {
    const parsed: unknown = JSON.parse(raw)

    if (typeof parsed !== "object" || parsed === null) {
      return null
    }

    const result: Record<string, number> = {}

    for (const [id, value] of Object.entries(parsed)) {
      if (
        validGemIds.has(id) &&
        typeof value === "number" &&
        Number.isFinite(value) &&
        value >= 0
      ) {
        result[id] = value
      }
    }

    return Object.keys(result).length > 0 ? result : null
  } catch {
    return null
  }
}

export function loadStoredGemPrices(): Record<string, number> | null {
  if (typeof window === "undefined") {
    return null
  }

  const raw = localStorage.getItem(GEM_PRICES_STORAGE_KEY)
  if (!raw) {
    return null
  }

  return parseStoredPrices(raw)
}

export function hasStoredGemPrices(): boolean {
  return loadStoredGemPrices() !== null
}

export function saveGemPrices(prices: Record<string, number>): void {
  if (typeof window === "undefined") {
    return
  }

  const payload = Object.fromEntries(
    gemTypes.map((gem) => [gem.id, prices[gem.id] ?? 0])
  )

  localStorage.setItem(GEM_PRICES_STORAGE_KEY, JSON.stringify(payload))
}

export function clearStoredGemPrices(): void {
  if (typeof window === "undefined") {
    return
  }

  localStorage.removeItem(GEM_PRICES_STORAGE_KEY)
}

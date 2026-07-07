export type SynthesisStep = {
  fromLevel: number
  toLevel: number
  lowerGemCost: number
  goldCost: number
}

export type GemType = {
  id: string
  name: string
  image?: string
  /** 暂无图片时用图标占位 */
  useIconPlaceholder?: boolean
  defaultUnitPriceInWan?: number
  synthesisSteps: SynthesisStep[]
}

export const MAX_GEM_LEVEL = 20
export const STARLIGHT_MAX_GEM_LEVEL = 11
export const SPIRIT_DUST_MAX_GEM_LEVEL = 15

export const STARLIGHT_GEM_ID = "starlight"
export const SPIRIT_DUST_GEM_ID = "spirit-dust"

export function getMaxGemLevel(gemId: string): number {
  if (gemId === STARLIGHT_GEM_ID) {
    return STARLIGHT_MAX_GEM_LEVEL
  }
  if (gemId === SPIRIT_DUST_GEM_ID) {
    return SPIRIT_DUST_MAX_GEM_LEVEL
  }
  return MAX_GEM_LEVEL
}

export type ExtraRequirement = {
  level: number
  count: number
}

/** 普通宝石 Lv.12 起额外提交（2 合 1 基础上） */
export const STANDARD_EXTRA_SYNTHESIS_REQUIREMENTS: Partial<
  Record<number, ExtraRequirement[]>
> = {
  12: [
    { level: 3, count: 1 },
    { level: 5, count: 1 },
    { level: 6, count: 1 },
  ],
  13: [{ level: 9, count: 1 }],
  14: [
    { level: 9, count: 1 },
    { level: 10, count: 1 },
  ],
  15: [
    { level: 9, count: 1 },
    { level: 12, count: 1 },
  ],
  16: [
    { level: 11, count: 1 },
    { level: 12, count: 1 },
    { level: 13, count: 1 },
  ],
  17: [{ level: 15, count: 1 }],
  18: [
    { level: 13, count: 1 },
    { level: 14, count: 1 },
    { level: 16, count: 1 },
  ],
  19: [
    { level: 15, count: 1 },
    { level: 16, count: 1 },
    { level: 17, count: 1 },
  ],
  20: [
    { level: 17, count: 1 },
    { level: 18, count: 2 },
  ],
}

/** 星辉石 Lv.9 起额外提交（全程 3 合 1 基础上） */
export const STARLIGHT_EXTRA_SYNTHESIS_REQUIREMENTS: Partial<
  Record<number, ExtraRequirement[]>
> = {
  9: [{ level: 5, count: 1 }],
  10: [
    { level: 6, count: 1 },
    { level: 7, count: 1 },
  ],
  11: [{ level: 9, count: 1 }],
}

/** 从 fromLevel 合成至 fromLevel+1 所需同级宝石数量 */
export function getMergeCount(gemId: string, fromLevel: number): number {
  if (gemId === STARLIGHT_GEM_ID) {
    return 3
  }
  return 2
}

export function getExtraRequirements(
  gemId: string,
  level: number
): ExtraRequirement[] | null {
  if (gemId === SPIRIT_DUST_GEM_ID) {
    return null
  }
  if (gemId === STARLIGHT_GEM_ID) {
    return STARLIGHT_EXTRA_SYNTHESIS_REQUIREMENTS[level] ?? null
  }
  return STANDARD_EXTRA_SYNTHESIS_REQUIREMENTS[level] ?? null
}

const totalGemsCache = new Map<string, number>()
const baseGemsCache = new Map<string, number>()

function cacheKey(gemId: string, level: number) {
  return `${gemId}:${level}`
}

function isSpiritDust(gemId: string) {
  return gemId === SPIRIT_DUST_GEM_ID
}

/** 仅基础合成规则（无额外提交）累计 1 级宝石 */
export function baseGemsRequiredForLevel(gemId: string, level: number): number {
  if (level < 1) {
    return 0
  }
  if (level === 1) {
    return 1
  }

  const key = cacheKey(gemId, level)
  const cached = baseGemsCache.get(key)
  if (cached !== undefined) {
    return cached
  }

  let total: number

  if (isSpiritDust(gemId)) {
    if (level === 2) {
      total = 2 * baseGemsRequiredForLevel(gemId, 1)
    } else {
      total =
        2 * baseGemsRequiredForLevel(gemId, level - 1) +
        baseGemsRequiredForLevel(gemId, level - 2)
    }
  } else {
    total =
      getMergeCount(gemId, level - 1) *
      baseGemsRequiredForLevel(gemId, level - 1)
  }

  baseGemsCache.set(key, total)
  return total
}

/**
 * 合成至 N 级累计所需 1 级宝石（含额外提交）。
 * 普通宝石：total(N) = merge × total(N-1) + 本级额外。
 * 五色灵尘：Lv.2 为 2×Lv.1；Lv.3+ 为 2×低 1 级 + 1×低 2 级。
 */
export function totalGemsRequiredForLevel(gemId: string, level: number): number {
  if (level < 1) {
    return 0
  }
  if (level === 1) {
    return 1
  }

  if (isSpiritDust(gemId)) {
    return baseGemsRequiredForLevel(gemId, level)
  }

  const key = cacheKey(gemId, level)
  const cached = totalGemsCache.get(key)
  if (cached !== undefined) {
    return cached
  }

  const prevTotal = totalGemsRequiredForLevel(gemId, level - 1)
  const mergeCount = getMergeCount(gemId, level - 1)
  const extras = getExtraRequirements(gemId, level)
  const directExtra =
    extras?.reduce(
      (sum, req) =>
        sum + req.count * totalGemsRequiredForLevel(gemId, req.level),
      0
    ) ?? 0

  const total = mergeCount * prevTotal + directExtra
  totalGemsCache.set(key, total)
  return total
}

/** @deprecated 使用 totalGemsRequiredForLevel(gemId, level) */
export function gemsRequiredForLevel(level: number) {
  return totalGemsRequiredForLevel("diamond", level)
}

export function formatExtraRequirements(requirements: ExtraRequirement[] | null) {
  if (!requirements?.length) {
    return null
  }

  return requirements.map((req) => `${req.level}级×${req.count}`).join("、")
}

function buildSynthesisSteps(baseGold: number): SynthesisStep[] {
  return Array.from({ length: MAX_GEM_LEVEL - 1 }, (_, index) => {
    const fromLevel = index + 1
    const toLevel = index + 2

    return {
      fromLevel,
      toLevel,
      lowerGemCost: 2,
      goldCost: Math.round(baseGold * 2 ** (toLevel - 2)),
    }
  })
}

export const gemTypes: GemType[] = [
  {
    id: "diamond",
    name: "黑宝石",
    image: "/gem/01.png",
    synthesisSteps: buildSynthesisSteps(800),
  },
  {
    id: "sapphire",
    name: "光芒石",
    image: "/gem/02.png",
    synthesisSteps: buildSynthesisSteps(1000),
  },
  {
    id: "ruby",
    name: "红玛瑙",
    image: "/gem/03.png",
    synthesisSteps: buildSynthesisSteps(1200),
  },
  {
    id: "raw-emerald",
    name: "舍利子",
    image: "/gem/04.png",
    synthesisSteps: buildSynthesisSteps(600),
  },
  {
    id: "crimson",
    name: "太阳石",
    image: "/gem/05.png",
    synthesisSteps: buildSynthesisSteps(1500),
  },
  {
    id: "moonstone",
    name: "月亮石",
    image: "/gem/07.png",
    synthesisSteps: buildSynthesisSteps(2500),
  },
  {
    id: "emerald",
    name: "翡翠石",
    image: "/gem/06.png",
    synthesisSteps: buildSynthesisSteps(2000),
  },
  {
    id: STARLIGHT_GEM_ID,
    name: "星辉石",
    image: "/gem/08.png",
    synthesisSteps: buildSynthesisSteps(3000),
  },
  {
    id: SPIRIT_DUST_GEM_ID,
    name: "五色灵尘",
    useIconPlaceholder: true,
    synthesisSteps: buildSynthesisSteps(1500),
  },
]

export type LevelCostRow = {
  level: number
  /** 累计 1 级宝石（含额外提交折算） */
  cumulativeLowerGems: number
  /** 基础合成规则累计 1 级宝石（无额外） */
  baseLowerGems: number
  /** 额外提交折算的 1 级宝石 */
  extraLowerGems: number
  extraRequirements: ExtraRequirement[] | null
  /** 累计总花费（万）= 累计 1 级宝石 × 单价（万） */
  cumulativeTotalInWan: number
}

export function buildLevelCostRows(
  gemId: string,
  unitPriceInWan = 0
): LevelCostRow[] {
  const maxLevel = getMaxGemLevel(gemId)

  return Array.from({ length: maxLevel }, (_, index) => {
    const level = index + 1
    const baseLowerGems = baseGemsRequiredForLevel(gemId, level)
    const cumulativeLowerGems = totalGemsRequiredForLevel(gemId, level)
    const extraLowerGems = cumulativeLowerGems - baseLowerGems

    return {
      level,
      cumulativeLowerGems,
      baseLowerGems,
      extraLowerGems,
      extraRequirements: getExtraRequirements(gemId, level),
      cumulativeTotalInWan: cumulativeLowerGems * unitPriceInWan,
    }
  })
}

export function getInitialUnitPrices() {
  return Object.fromEntries(
    gemTypes.map((gem) => [gem.id, gem.defaultUnitPriceInWan ?? 0])
  ) as Record<string, number>
}

export function formatGold(value: number) {
  return value.toLocaleString("zh-CN")
}

export function formatWan(value: number) {
  return value.toLocaleString("zh-CN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
}

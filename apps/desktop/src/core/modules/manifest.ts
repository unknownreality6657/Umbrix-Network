import type { UmbrixModuleManifest } from "@umbrix/shared"

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

export function isUmbrixModuleManifest(value: unknown): value is UmbrixModuleManifest {
  if (!isObject(value)) return false

  if (typeof value.id !== "string") return false
  if (typeof value.name !== "string") return false
  if (typeof value.version !== "string") return false
  if (typeof value.author !== "string") return false
  if (typeof value.description !== "string") return false

  if (!isObject(value.entry)) return false
  if (value.entry.ui !== undefined && typeof value.entry.ui !== "string") return false
  if (value.entry.background !== undefined && typeof value.entry.background !== "string") return false

  if (value.navigation !== undefined) {
    if (!isObject(value.navigation)) return false
    if (typeof value.navigation.label !== "string") return false
    if (value.navigation.icon !== undefined && typeof value.navigation.icon !== "string") return false
    if (value.navigation.order !== undefined && typeof value.navigation.order !== "number") return false
  }

  if (!Array.isArray(value.permissions) || !value.permissions.every((p) => typeof p === "string")) {
    return false
  }

  if (!isObject(value.features)) return false
  if (typeof value.features.ui !== "boolean") return false
  if (typeof value.features.background !== "boolean") return false
  if (value.features.settings !== undefined && typeof value.features.settings !== "boolean") return false

  if (value.icon !== undefined && typeof value.icon !== "string") return false

  return true
}
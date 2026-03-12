export interface UmbrixModuleEntry {
  ui?: string
  background?: string
}

export interface UmbrixModuleNavigation {
  label: string
  icon?: string
  order?: number
}

export interface UmbrixModuleFeatures {
  ui: boolean
  background: boolean
  settings?: boolean
}

export interface UmbrixModuleManifest {
  id: string
  name: string
  version: string
  author: string
  description: string
  icon?: string
  entry: UmbrixModuleEntry
  navigation?: UmbrixModuleNavigation
  permissions: string[]
  features: UmbrixModuleFeatures
}
import { invoke } from "@tauri-apps/api/core"
import type { UmbrixModuleManifest } from "@umbrix/shared"
import { isUmbrixModuleManifest } from "./manifest"

export async function getRegisteredModules(): Promise<UmbrixModuleManifest[]> {
  const result = await invoke<unknown[]>("load_module_manifests")

  const validated = result.filter(isUmbrixModuleManifest)

  return validated.sort((a, b) => {
    return (a.navigation?.order ?? 999) - (b.navigation?.order ?? 999)
  })
}
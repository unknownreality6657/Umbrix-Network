import { useEffect, useState } from "react"
import type { UmbrixModuleManifest } from "@umbrix/shared"
import { getRegisteredModules } from "../core/modules/registry"

interface SidebarProps {
  activePage: string
  setActivePage: (page: string) => void
}

export default function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const [modules, setModules] = useState<UmbrixModuleManifest[]>([])

  useEffect(() => {
  async function loadModules() {
    const loadedModules = await getRegisteredModules()

    const navigableModules = loadedModules.filter((module) => module.navigation)

    setModules(navigableModules)
  }

  loadModules()
}, [])

  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        background: "#101010",
        borderRight: "1px solid #222",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Umbrix</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          onClick={() => setActivePage("hub")}
          style={{ fontWeight: activePage === "hub" ? "bold" : "normal" }}
        >
          Hub
        </button>

        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => setActivePage(module.id)}
            style={{ fontWeight: activePage === module.id ? "bold" : "normal" }}
          >
            {module.navigation?.label}
          </button>
        ))}

        <button
          onClick={() => setActivePage("settings")}
          style={{ fontWeight: activePage === "settings" ? "bold" : "normal" }}
        >
          Settings
        </button>
      </nav>
    </div>
  )
}
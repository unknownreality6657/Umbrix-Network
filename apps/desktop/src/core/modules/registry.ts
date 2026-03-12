import type { UmbrixModuleManifest } from "@umbrix/shared"

const mockModules: UmbrixModuleManifest[] = [
  {
    id: "umbrix.chat",
    name: "Chat",
    version: "0.1.0",
    author: "Shadows of Creation",
    description: "Real-time communication module for Umbrix.",
    icon: "message-circle",
    entry: {
      ui: "index.tsx",
      background: "background.ts",
    },
    navigation: {
      label: "Chat",
      icon: "message-circle",
      order: 10,
    },
    permissions: ["storage.read", "storage.write", "network.client"],
    features: {
      ui: true,
      background: true,
      settings: false,
    },
  },
  {
    id: "umbrix.projects",
    name: "Projects",
    version: "0.1.0",
    author: "Shadows of Creation",
    description: "Project planning and collaboration tools.",
    icon: "folder-kanban",
    entry: {
      ui: "index.tsx",
    },
    navigation: {
      label: "Projects",
      icon: "folder-kanban",
      order: 20,
    },
    permissions: ["storage.read", "storage.write"],
    features: {
      ui: true,
      background: false,
      settings: false,
    },
  },
]

export function getRegisteredModules(): UmbrixModuleManifest[] {
  return mockModules
}
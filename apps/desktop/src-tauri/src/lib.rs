use serde::{Deserialize, Serialize};
use std::fs;
use std::path::{Path, PathBuf};

#[derive(Debug, Serialize, Deserialize)]
struct ModuleEntry {
    #[serde(skip_serializing_if = "Option::is_none")]
    ui: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    background: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct ModuleNavigation {
    label: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    icon: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    order: Option<i32>,
}

#[derive(Debug, Serialize, Deserialize)]
struct ModuleFeatures {
    ui: bool,
    background: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    settings: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize)]
struct ModuleManifest {
    id: String,
    name: String,
    version: String,
    author: String,
    description: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    icon: Option<String>,
    entry: ModuleEntry,
    #[serde(skip_serializing_if = "Option::is_none")]
    navigation: Option<ModuleNavigation>,
    permissions: Vec<String>,
    features: ModuleFeatures,
}

fn find_modules_dir() -> Option<PathBuf> {
    let mut current = std::env::current_dir().ok()?;

    for _ in 0..8 {
        let candidate = current.join("modules");
        if candidate.exists() && candidate.is_dir() {
            return Some(candidate);
        }

        if !current.pop() {
            break;
        }
    }

    None
}

fn load_manifest_from_file(path: &Path) -> Option<ModuleManifest> {
    let content = fs::read_to_string(path).ok()?;
    serde_json::from_str::<ModuleManifest>(&content).ok()
}

#[tauri::command]
fn load_module_manifests() -> Result<Vec<ModuleManifest>, String> {
    let modules_dir = find_modules_dir().ok_or("Could not locate modules directory")?;

    let entries = fs::read_dir(modules_dir).map_err(|e| e.to_string())?;

    let mut manifests = Vec::new();

    for entry in entries {
        let entry = entry.map_err(|e| e.to_string())?;
        let path = entry.path();

        if !path.is_dir() {
            continue;
        }

        let manifest_path = path.join("umbrix.module.json");

        if !manifest_path.exists() {
            continue;
        }

        if let Some(manifest) = load_manifest_from_file(&manifest_path) {
            manifests.push(manifest);
        }
    }

    manifests.sort_by_key(|m| m.navigation.as_ref().and_then(|n| n.order).unwrap_or(999));

    Ok(manifests)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![load_module_manifests])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

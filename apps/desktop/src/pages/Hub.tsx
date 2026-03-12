import { getRegisteredModules } from "../core/modules/registry"

export default function Hub() {
  const modules = getRegisteredModules()

  return (
    <div>
      <h1>Umbrix Network</h1>
      <p>Modular collaboration hub</p>

      <div style={{ marginTop: "24px" }}>
        <h2>Installed Modules</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          {modules.map((module) => (
            <div
              key={module.id}
              style={{
                border: "1px solid #2a2a2a",
                borderRadius: "12px",
                padding: "16px",
                background: "#161616",
              }}
            >
              <h3 style={{ margin: "0 0 8px 0" }}>{module.name}</h3>
              <p style={{ margin: "0 0 12px 0", opacity: 0.8 }}>
                {module.description}
              </p>
              <small style={{ opacity: 0.6 }}>
                v{module.version} • {module.author}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
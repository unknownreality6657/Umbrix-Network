import { useState } from "react"
import Sidebar from "./components/Sidebar"
import Hub from "./pages/Hub"
import "./App.css"

function App() {
  const [activePage, setActivePage] = useState("hub")

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0b0b0b",
        color: "#f5f5f5",
      }}
    >
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main
        style={{
          flex: 1,
          padding: "32px",
        }}
      >
        {activePage === "hub" && <Hub />}

        {activePage !== "hub" && (
          <div>
            <h2>{activePage}</h2>
            <p>This module will render here.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
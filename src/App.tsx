import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"

function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <div style={{ padding: "20px", flex: 1 }}>
        <Home />
      </div>
    </div>
  )
}

export default App
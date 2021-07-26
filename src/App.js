import React, { useState } from "react"
import Navbar from "./components/Navbar"
import Timer from "./components/Timer"
import Tasks from "./components/Tasks"
import Settings from "./components/Settings"
import "./App.css"

function App() {
  const [settingsOpen, isSettingsOpen] = useState(false)
  console.log(settingsOpen)

  const handleSettings = () => {
    isSettingsOpen(!settingsOpen)
  }
  return (
    <div className="app">
      {settingsOpen && (
        <div className="overlay"></div>
      )}
      <Navbar handleSettings={handleSettings}/>
      <Timer/>
      <Tasks/>
      {settingsOpen && <Settings handleSettings={handleSettings}/>}
    </div>
    
  );
}

export default App;

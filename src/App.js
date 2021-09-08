import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar"
import Timer from "./components/Timer"
import Tasks from "./components/Tasks"
import Settings from "./components/Settings"
import alarmSound from "./ringtones/alarm-clock.mp3"
import bellSound from "./ringtones/bell.mp3"
import birdSound from "./ringtones/bird.mp3"
import hornSound from "./ringtones/horn.mp3"
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css"
import axios from 'axios'

function App() {
  const [settingsOpen, isSettingsOpen] = useState(false)
  const [typesTimer, setTypesTimer] = useState({
    pomodoro: 45,
    shortBreak: 5,
    longBreak: 10
  })
  const [timerStarted, setTimerStarted] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  const [loggedUser, setLoggedUser] = useState({
    username: ''
  })
  const [type, setType] = useState("Pomodoro")
  const [currentTone, setCurrentTone] = useState("Alarm")

  const {pomodoro, shortBreak, longBreak} = typesTimer
  
  useEffect(() => {
    setTimerStarted(false)
  }, [typesTimer])

  const handleLogout = () => {
    axios.get('https://time-to-focus-heroku.herokuapp.com/users/logout')
    .then(res => {
      if(res.data.isLoggedOut){
        setIsLogged(false)
        setLoggedUser({
          username: ''
        })
      }
    })
  }

  const playRingtone = () => {
      if(currentTone === "Alarm"){
            let playRingtone = new Audio(alarmSound)
            playRingtone.play()
        }
      if(currentTone === "Bird"){
          let playRingtone = new Audio(birdSound)
          playRingtone.play()
      }
      if(currentTone === "Horn"){
          let playRingtone = new Audio(hornSound)
          playRingtone.play()
      }
      if(currentTone === "Bell"){
          let playRingtone = new Audio(bellSound)
          playRingtone.play()
      }
  }

  const handleSettings = () => {
    if(pomodoro === 0 || shortBreak === 0 || longBreak === 0){
      alert('One of the timer is set to 0')
      return
    }
    if(timerStarted){
      if(window.confirm('Do you want exit the current session?')){
        isSettingsOpen(!settingsOpen)
        setTypesTimer({
          pomodoro: 45,
          shortBreak: 5,
          longBreak: 10
        })
        setTimerStarted(false)
      }
    }else{
      isSettingsOpen(!settingsOpen)
    }
}

  return (
      <div className="app Pomodoro">
        <Router>
          <Switch>
            <Route path="/users/login">
              <Login setLoggedUser={setLoggedUser} setIsLogged={setIsLogged}/>
            </Route>
            <Route path="/users/register">
              <Register/>
            </Route>
            <Route exact path="/">
              {settingsOpen && (
                <div className="overlay"></div>
              )}
              <Navbar timerStarted={timerStarted} handleLogout={handleLogout} isLogged={isLogged} loggedUser={loggedUser} handleSettings={handleSettings}/>
              {isLogged && (
                <div className="logged-user">
                  <h1 className="logged-user"> Hello, {loggedUser.username}</h1>
                  <p>Start Studying...</p>
                </div>
              )}
              <Timer timerStarted={timerStarted} setTimerStarted={setTimerStarted} typesTimer={typesTimer} playRingtone={playRingtone} currentTone={currentTone} setType={setType} type={type}/>
              <Tasks/>
              {settingsOpen && <Settings handleSettings={handleSettings} typesTimer={typesTimer} setTypesTimer={setTypesTimer} setCurrentTone={setCurrentTone}/>}
            </Route>
          </Switch>
          <footer>
            <p>Made by Anirud Shrestha</p>
          </footer>
        </Router>
      </div>
    
  );
}

export default App;

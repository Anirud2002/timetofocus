import React, { useEffect, useState } from 'react'
import clickSound from '../ringtones/click-sound.mp3'

function Pomodoro(props) {
    const {timerStarted, typesTimer, playRingtone, setTimerStarted} = props
    const [minutes, setMinutes] = useState(typesTimer.pomodoro)
    const [seconds, setSeconds] = useState(0)
    const [isActive, setIsActive] = useState(false);
    const [alreadyStarted, setAlreadyStarted] = useState(false)
    
    useEffect(() => {
        const app = document.querySelector('.app')
        app.className = "app Pomodoro"
    }, [])

    useEffect(() => {
        setMinutes(typesTimer.pomodoro)
        setSeconds(0)
    }, [typesTimer])

    useEffect(() => {
        if(!timerStarted){
            reset()
        }else{
            return 
        }
    }, [timerStarted])

    useEffect(() => {
        let interval = null;
        if (isActive) {
            setTimerStarted(true)
            if(!alreadyStarted){
                setAlreadyStarted(true)
                setMinutes(minutes - 1)
                setSeconds(59)
            }
            interval = setInterval(() => {
                
                if(minutes === 0 && seconds === 0){
                    clearInterval(interval)
                    setAlreadyStarted(false)
                    setMinutes(typesTimer.pomodoro)
                    setSeconds(0)
                    setIsActive(false)
                    playRingtone()
                    return
                }
                if(seconds === 0){
                    setMinutes(minutes - 1)
                    setSeconds(60)
                }
                setSeconds(seconds => seconds - 1);
            }, 1000);
            } else if (!isActive && seconds !== 0) {
                clearInterval(interval);
            }
            return () => clearInterval(interval);
    }, [isActive, seconds])


    const toggle = () => {
        new Audio(clickSound).play()
        setIsActive(!isActive)
    }

    const reset = () => {
        setIsActive(false)
        setMinutes(typesTimer.pomodoro)
        setSeconds(0)
        setAlreadyStarted(false)
    }

    return (
        <>
            <h1 className="clock-h1">{minutes < 10? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            <button style={{color: 'rgb(219, 82, 77)'}} onClick={() => toggle()} className="start">{isActive ? 'Pause' : 'Start'}</button>     
        </>
    )
}

export default Pomodoro

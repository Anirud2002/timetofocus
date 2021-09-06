import React, {useEffect, useState} from 'react'
import clickSound from '../ringtones/click-sound.mp3'

function LongBreak(props) {
    const {timerStarted, setTimerStarted, typesTimer, playRingtone} = props
    const [minutes, setMinutes] = useState(typesTimer.longBreak)
    const [seconds, setSeconds] = useState(0)
    const [isActive, setIsActive] = useState(false);
    const [alreadyStarted, setAlreadyStarted] = useState(false)


    useEffect(() => {
        setMinutes(typesTimer.longBreak)
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
                    setMinutes(typesTimer.longBreak)
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

    useEffect(() => {
        const app = document.querySelector('.app')
        app.className = "app LB"
    }, [])

    const toggle = () => {
        new Audio(clickSound).play()
        setIsActive(!isActive)
    }

    const reset = () => {
        setIsActive(false)
        setMinutes(typesTimer.longBreak)
        setSeconds(0)
        setAlreadyStarted(false)
    }

    return (
        <>
            <h1 className="clock-h1">{minutes < 10? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            <button style={{color: 'rgb(17, 124, 186)'}} className="start" onClick={() => toggle()}>{isActive ? 'Pause' : 'Start'}</button>
         
        </>
    )
}

export default LongBreak


import React from 'react'
import { useState } from 'react'
import "./Timer.css"

function Timer() {
    let [minutes, setMinutes] = useState(1)
    let [seconds, setSeconds] = useState(0)
    const [isPause, setIsPause] = useState(true)

    function startTimer() {
        setIsPause(!isPause)
        if(isPause){
            clearInterval(startSeconds)
        }
        let i = 59
        minutes--
        setMinutes(minutes)
        seconds = i
        setSeconds(seconds)
        let startSeconds = setInterval(() => {
            console.log(minutes, seconds)
            i--
            seconds = i
            setSeconds(seconds)
            if(minutes ===  0 && seconds === 0){
                clearInterval(startSeconds)
            }
               
        }, 1000)

    }
 
    return (
        <div className='timer'>
            <div className="timer-types">
                <button className="active">Pomodoro</button>
                <button>Short Break</button>
                <button>Long Break</button>
            </div>
            <h1 className="clock-h1">{minutes < 10? 0: null}{minutes}:{seconds < 10? 0: null}{seconds}</h1>
            {!isPause ? (
                <button className="pause" onClick={startTimer}>PAUSE</button>
            ) : (
                <button className="start" onClick={startTimer}>START</button>
            )}
        </div>
    )
}

export default Timer

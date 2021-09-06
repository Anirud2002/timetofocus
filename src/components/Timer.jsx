import React, { useEffect } from 'react'
import { useState } from 'react'
import "./css/Timer.css"
import Pomodoro from './Pomodoro'
import ShortBreak from './ShortBreak'
import LongBreak from './LongBreak'


function Timer(props) {
    const {timerStarted, setTimerStarted, typesTimer, playRingtone, currentTone, setType, type} = props
    const [pomodoroTimer, setPomodoroTimer] = useState(true)
    const [shortBreakTimer, setShortBreakTimer] = useState(false)
    const [longBreakTimer, setLongBreakTimer] = useState(false)

    useEffect(()=> {
        if(type === "Pomodoro"){
            setPomodoroTimer(true)
            setShortBreakTimer(false)
            setLongBreakTimer(false)
        }
        if(type === "SB"){
            setPomodoroTimer(false)
            setShortBreakTimer(true)
            setLongBreakTimer(false)
        }
        if(type === "LB"){
            setPomodoroTimer(false)
            setShortBreakTimer(false)
            setLongBreakTimer(true)
        }
    }, [typesTimer, type])

    useEffect(() => {
        const buttons = document.querySelectorAll(".timer-types button")
        buttons.forEach(button => {
            button.addEventListener("click", (e) => {
                buttons.forEach(btn => {
                    btn.classList.remove("active")
                })
                e.target.classList.add("active")
                const timerType = e.target.innerHTML
                if(timerType === "Pomodoro"){
                    setType("Pomodoro")
                }
                if(timerType === "Short Break"){
                    setType("SB")

                }
                if(timerType === "Long Break"){
                    setType("LB")
                }   
            })
        })

    }, [])

    useEffect(() => {
        const buttons = document.querySelectorAll(".timer-types button")
        buttons.forEach(btn => {
            btn.classList.remove('active')
            if(type === "Pomodoro"){
                buttons[0].classList.add('active')
            }
            if(type === "SB"){
                buttons[1].classList.add('active')
            }
            if(type === "LB"){
                buttons[2].classList.add('active')
            }
        })
    }, [type])

    return (
        <div className='timer'>
            <div className="timer-types">
                <button className="active">Pomodoro</button>
                <button>Short Break</button>
                <button>Long Break</button>
            </div>
            {pomodoroTimer &&  <Pomodoro timerStarted={timerStarted} setTimerStarted={setTimerStarted}  typesTimer={typesTimer} playRingtone={playRingtone} currentTone={currentTone}/>}
            {shortBreakTimer && <ShortBreak timerStarted={timerStarted} setTimerStarted={setTimerStarted} typesTimer={typesTimer} playRingtone={playRingtone} currentTone={currentTone}/>}
            {longBreakTimer && <LongBreak timerStarted={timerStarted} setTimerStarted={setTimerStarted} typesTimer={typesTimer} playRingtone={playRingtone} currentTone={currentTone}/>} 
        </div>
    )
}

export default Timer

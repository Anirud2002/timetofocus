import React, { useEffect, useState } from 'react'
import "./css/Settings.css"
import { sounds } from "../assets"
import alarmSound from "../ringtones/alarm-clock.mp3"
import bellSound from "../ringtones/bell.mp3"
import birdSound from "../ringtones/bird.mp3"
import hornSound from "../ringtones/horn.mp3"

function Settings(props) {
    const { handleSettings, typesTimer, setTypesTimer, setCurrentTone } = props
    const [soundOptions, setSoundOptions] = useState(false)
    let [currentSound, setCurrentSound] = useState("Alarm")
    const { pomodoro, shortBreak, longBreak } = typesTimer


    useEffect(() => {
        const tones = document.querySelectorAll(".sounds")
        tones.forEach((tone, index) => {
            tone.addEventListener("click", () => {
                currentSound = sounds[index]
                setCurrentSound(currentSound)
                setCurrentTone(currentSound)
                if(currentSound === "Alarm"){
                    let playRingtone = new Audio(alarmSound)
                    playRingtone.play()
                }
                if(currentSound === "Bird"){
                    let playRingtone = new Audio(birdSound)
                    playRingtone.play()
                }
                if(currentSound === "Horn"){
                    let playRingtone = new Audio(hornSound)
                    playRingtone.play()
                }
                if(currentSound === "Bell"){
                    let playRingtone = new Audio(bellSound)
                    playRingtone.play()
                }
            })
        })
    }, [currentSound])

    const handleClick = () => {
        handleSettings()
    }

    const handleChangePomo = e => {
        setTypesTimer({
            ...typesTimer, pomodoro: Number(e.target.value) > 60 ? 60 : Number(e.target.value)
        })
    }
    const handleChangeSB = e => {
        setTypesTimer({
            ...typesTimer, shortBreak: Number(e.target.value) > 10 ? 10 : Number(e.target.value)
        })
    }
    const handleChangeLB = e => {
        setTypesTimer({
            ...typesTimer, longBreak: Number(e.target.value) > 20 ? 20 : Number(e.target.value)
        })
    }


    return (
        <div className="settings">
            <div className="setting-header">
                <h2 className="setting-h2">TIMER SETTING</h2>
                <button className='close-btn' onClick={handleSettings}><i className="fas fa-times"></i></button>
            </div>
            <div className="set-timer">
                <h4>Time (minutes)</h4>
                <div className="set-time">
                    <div>
                        <h5>Pomodoro</h5>
                        <input type="number" value={pomodoro} onChange={handleChangePomo} name="pomodoro" />
                    </div>
                    <div>
                        <h5>Short Break</h5>
                        <input type="number" value={shortBreak} onChange={handleChangeSB} name="shortBreak" />
                    </div>
                    <div>
                        <h5>Long Break</h5>
                        <input type="number" value={longBreak} onChange={handleChangeLB} name="longBreak" />
                    </div>

                </div>
            </div>

            <div className="alarm-sound">
                <h4>Alarm Sound</h4>
                <div className="sound-options">
                    <div className="s-opt" onClick={() => setSoundOptions(!soundOptions)}>
                        <p>{currentSound}</p>
                        <i className="fas fa-sort-down"></i>

                        <div className={soundOptions ? 'options show' : 'options'}>
                            {sounds.map((sound, index) => {
                                return <p key={index} className="sounds">{sound}</p>
                            })}
                        </div>
                    </div>

                </div>
            </div>

            <div className="setting-footer">
                <button onClick={handleClick} type="button">SAVE</button>
            </div>
        </div>
    )
}

export default Settings

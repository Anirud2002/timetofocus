import React, { useEffect, useState } from 'react'
import "./Settings.css"
import {sounds} from "../assets"
import CheckIcon from '@material-ui/icons/Check';

function Settings(props) {
    const {handleSettings} = props
    const [activeSoundIndex, setActiveSoundIndex] = useState(0)
    const [soundOptions, setSoundOptions] = useState(false)
    const [currentSound, setCurrentSound] = useState("Kitchen")
    const [autoPlayBreaks, isAutoPlayBreaks] = useState(true)

    useEffect(() => {
        console.log("yea boi")
        const tones = document.querySelectorAll(".sounds")
        tones.forEach((tone, index) => {
            tone.addEventListener("click", () => {
                setCurrentSound(sounds[index])
            })
        })
        document.querySelector(".app").addEventListener('click', () => {
            
        })
    }, [currentSound])

   
    return (
        <form className="settings">
            <div className="setting-header">
                <h2 className="setting-h2">TIMER SETTING</h2>
                <button className='close-btn' onClick={handleSettings}><i className="fas fa-times"></i></button>
            </div>
            <div className="set-timer">
                <h4>Time (minutes)</h4>
                <div className="set-time">
                    <div>
                        <h5>Pomodoro</h5>
                        <input type="number" defaultValue="5" name="pomodoro"/>
                    </div>
                    <div>
                        <h5>Short Break</h5>
                        <input type="number" defaultValue="45" name="pomodoro"/>
                    </div>
                    <div>
                        <h5>Long Break</h5>
                        <input type="number" defaultValue="15" name="pomodoro"/>
                    </div>

                </div>
            </div>
            <div className="auto-start-breaks">
                 <h4>Auto start Breaks?</h4>
                 <div className={autoPlayBreaks? "switch on" : "switch"} onClick={() => isAutoPlayBreaks(!autoPlayBreaks)}>
                     <div className={autoPlayBreaks? "cir on" : "cir"}></div>
                 </div>
            </div>
            <div className="alarm-sound">
                 <h4>Alarm Sound</h4>
                 <div className="sound-options">
                     <div className="s-opt"  onClick={() => setSoundOptions(!soundOptions)}>
                        <p>{currentSound}</p>
                        <i className="fas fa-sort-down"></i>
                     
                        <div className={soundOptions? 'options show' : 'options'}>
                            {sounds.map((sound, index) => {
                                return <p key={index} className="sounds">{sound}</p>
                            })}
                        </div>
                     </div>
                     

                     <div className="repeat-sound">
                         <p>repeat</p>
                         <input type="number" min="1" max="5" defaultValue='1'/>
                     </div>
                 </div>
            </div>

            <div className="setting-footer">
                <button type="submit">SAVE</button>
            </div>
        </form>
    )
}

export default Settings

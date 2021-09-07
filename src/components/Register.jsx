import React, { useState } from 'react'
import "./css/Login.css"
import {Link, useHistory} from "react-router-dom"
import axios from 'axios'

function Register() {
    let history = useHistory()
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })
    const [errors, setErrors] = useState([])

    const {username, email, password, password2} = user

    const onChangeUsername = e => {
        setUser({...user, username: e.target.value})
    }
    const onChangeEmail = e => {
        setUser({...user, email: e.target.value})
    }
    const onChangePassword = e => {
        setUser({...user, password: e.target.value})
    }
    const onChangePassword2 = e => {
        setUser({...user, password2: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault()
        let errors = []
        if(!username || !email || !password || !password2){
            errors.push({msg: "Please fill out all the fields!"})
        }
        if(password !== password2){
            errors.push({msg: "Your password didn't match!"})
        }
        if(password.split('').length < 8){
            errors.push({msg: "Your password must be 8 characters long"})
        }
        if(errors.length > 0){
            setErrors(errors)
            setTimeout(() => {
                setErrors([])
            }, 3000)
        }
        else{
            axios.post("https://time-to-focus-heroku.herokuapp.com/users/register", user)
            .then(res => {
                if(res.data.error){
                    setErrors([{msg: res.data.msg}])
                    setTimeout(() => {
                        setErrors([])
                    }, 2000)
                }else{
                    history.push('/users/login')
                }
            })
        }
        
        
        
        
    }


    return (
        <div className="register">
            <div className="logo">
                <i class="fas fa-hourglass-half logo-icon"></i>
                <h1>TimeToFocus</h1>
            </div>
            <form className="login-form" onSubmit={onSubmit}>
                {errors.map(err => {
                    return <div key={err.msg} className='err-div'>
                        <p>{err.msg}</p>
                    </div>
                })}
                <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input onChange={onChangeUsername} value={user.username} type="name" id="name" name="name" class="form-control" placeholder="Enter an Username" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={onChangeEmail} value={user.email} type="email" id="email" name="email" class="form-control" placeholder="Enter Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={onChangePassword} value={user.password} type="password" id="password" name="password" class="form-control" placeholder="Enter Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirm Password</label>
                    <input onChange={onChangePassword2} value={user.password2} type="password" id="password2" name="password" class="form-control" placeholder="Re-enter your password" />
                </div>
                <button className="login-btn" type="submit">Register</button>
                <Link to="/users/login">Already have an account? <span>Login</span></Link>
            </form>
            <Link className="back-to-home" to="/">Back to home</Link>
        </div>
    )
}

export default Register

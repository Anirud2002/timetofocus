import React, {useState} from 'react'
import "./css/Login.css"
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'



function Login(props) {
    const {setLoggedUser, setIsLogged} = props
    let history = useHistory()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const {email, password} = user
    const [errors, setErrors] = useState([])

    const onChangeEmail = e => {
        setUser({...user, email: e.target.value})
    }

    const onChangePassword = e => {
        setUser({...user, password: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        let errors = []
        if(!email || !password){
            errors.push({msg: "Please fill out all the fields"})
        }
        if(errors.length > 0){
            setErrors(errors)
        }
        else{
            axios.post('https://time-to-focus-heroku.herokuapp.com/users/login', user)
            .then(res => {
                if(res.data.authenticated){
                    setIsLogged(true)
                    setLoggedUser({username: res.data.user.username})
                    history.push('/')
                }
                if(res.data.error){
                    setErrors([{msg: res.data.msg}])
                    setTimeout(() => {
                        setErrors([])
                    }, 2000)
                }
                
            })

        }
        if(errors.length > 0){
            setErrors(errors)
            setTimeout(() => {
                setErrors([])
            }, 3000)
        }
    }

    return (
        <div className="login">
            <div className="logo">
                <i class="fas fa-hourglass-half logo-icon"></i>
                <h1>TimeToFocus</h1>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                {errors.map(err => {
                    return <div key={err.msg} className='err-div'>
                        <p>{err.msg}</p>
                    </div>
                })}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={onChangeEmail} value={email} type="email" id="email" name="email" class="form-control" placeholder="Enter Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={onChangePassword} value={password} type="password" id="password" name="password" class="form-control" placeholder="Enter Password" />
                </div>
                <button className="login-btn" type="submit">Login</button>
                <Link to="/users/register">Don't have an account? <span>Register</span></Link>
            </form>
            <Link className="back-to-home" to="/">Back to home</Link>
        </div>
    )
}

export default Login

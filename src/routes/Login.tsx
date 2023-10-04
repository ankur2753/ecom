import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import '../css/Login.css'
import { loginUserAction } from '../redux/actions/ApiActions'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL, HOME, LOGIN, SIGNUP } from '../constants/links'


const Login = () => {
    const [ userName, setUserName ] = useState("")
    const [ password, setPassword ] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (event.currentTarget.checkValidity()) {
            axios.post(BASE_URL + '/login', {
                "username": userName,
                "password": password
            }).then(res => res.data)
                .then(data => {
                    dispatch(loginUserAction(data))
                    navigate(HOME.to)
                })
                .catch(res => alert(res.response.data));
        }
    }

    return (
        <div className="center">
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div className="txt_field">
                    <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" required />
                    <span></span>
                    <label>Username</label>
                </div>
                <div className="txt_field">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                    <span></span>
                    <label>Password</label>
                </div>
                <input type="submit" value={LOGIN.text} />
                <div className="signup_link">
                    Not a member ? <Link to={SIGNUP.to}> {SIGNUP.text}</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
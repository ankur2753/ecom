import axios from 'axios'
import { useEffect, useState } from 'react'
import '../css/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL, LOGIN, SIGNUP } from '../constants/links'
import Success from '../components/Success'


const SignUp = () => {
    const [ userName, setUserName ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirm, setConfirmPassword ] = useState("")
    const [ isSignedUp, setIsSignedUp ] = useState(false)
    const navigate = useNavigate()
    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (event.currentTarget.checkValidity()) {
            if (password !== confirm) {
                alert("confirm password must be same as password")
                return;
            }
            axios.post(BASE_URL + '/register', {
                "username": userName,
                "password": password
            }).then(res => res.data)
                .then(data => {
                    if (data === true) {
                        setIsSignedUp(data)
                    }
                })
                .catch(res => alert(res.response.data));
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isSignedUp) {
                navigate(LOGIN.to)
            }
        }, 4000)

        return () => {
            clearTimeout(timer);
        }
    }, [ isSignedUp, navigate ])

    if (isSignedUp) {
        const head = `Successfully created User ${userName}`;
        return <div className='d-flex align-items-center justify-content-center'>

            <Success headingtext={head} msg='thank you for signin up with us ' footerText='you will be redirected to Login page soon' />
        </div>
    }

    return (
        <div className="center">
            <h1>Sign Up</h1>
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
                <div className="txt_field">
                    <input value={confirm} onChange={(e) => setConfirmPassword(e.target.value)} type="password" required />
                    <span></span>
                    <label>Confirm Password</label>
                </div>
                <input type="submit" value={SIGNUP.text} />
                <div className="signup_link">
                    Already Signed Up ? <Link to={LOGIN.to}> {LOGIN.text}</Link>
                </div>
            </form>
        </div>
    )
}

export default SignUp
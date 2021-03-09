import React from 'react'
import './login.css'
import {loginUrl} from '../../request/spotify'

function Login() {
    return (
        <div className="login">
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="logo"/>
            <a href={loginUrl}>Login With Facebook</a>
            
        </div>
    )
}

export default Login

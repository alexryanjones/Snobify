import React from 'react';
import logo from '../assets/Snobify-Logo.svg'


const client_id = process.env.REACT_APP_CLIENT_ID;
const response_type = 'code';
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
const scope =
'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-private%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played';

const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`;

function Login () {

    return (
        <div className='blocker'>
            <img id='login-logo' src={logo} alt='logo'/>
            <p id='login-text'>Inspiring musical diversity through AI</p>
            <a id='login-button' href={authUrl}>Login with Spotify</a>
        </div>
    );
}

export default Login;
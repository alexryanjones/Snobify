import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTrack } from '../Redux/currentTrack';
import { setPlayState } from '../Redux/currentPlayState';
import { setDeviceId } from '../Redux/deviceId';
import axios from 'axios';


// import playSVG from '../assets/play.svg'

function WebPlayback() {
    const { token } = useSelector((state) => state.accessToken);
    const { currentPlayState } = useSelector((state) => state.currentPlayState);
    const currentTrack = useSelector((state) => state.currentTrack);
    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(currentTrack);
    const { deviceId } = useSelector((state) => state.deviceId);
    const dispatch = useDispatch()
    // const [title, setTitle] = useState('')
    // const [artist, setArtist] = useState('')
    // const [artworkUrl, setArtworkUrl] = useState('')


    useEffect(() => {

    setCurrentTrack(currentTrack)
    setActive(true)
    }, [currentTrack])

    // set now playing track info
    useEffect(() => {
        if (!current_track) return;
        // console.log(current_track);
        // setArtist(current_track.artists[0].name)
        // setTitle(current_track.name)
        // setArtworkUrl(current_track.album.images[0].url)
    }, [current_track])

useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {

        const player = new window.Spotify.Player({
            name: 'Web Playback SDK',
            getOAuthToken: cb => { cb(token); },
            volume: 0.5
        });

        setPlayer(player);

        player.addListener('ready', ({ device_id }) => {
            dispatch(setDeviceId(device_id))
            console.log('Ready with Device ID', device_id);
        });

        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });


        player.connect();

        player.addListener('player_state_changed', ( state => {

    if (!state) {
        return;
    }

    setTrack(state.track_window.current_track);
    setPaused(state.paused);


    player.getCurrentState().then( state => { 
        (!state)? setActive(false) : setActive(true) 
    });

}));

    };
}, []);

const handlePause = async () => {
    try {
    await axios.put(
        
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        // {"uris": [`${track.uri}`]},
        {
        headers:
        {'Authorization': `Bearer ${token}`}
        },    
    );
    console.log('request sent');
    } catch (err) {
    console.log(err);
    }
}

    return (
    <>
        <div className="player">
            {currentTrack.name ? 
            <div className='playing-track'>
                <img src={current_track.album.images[2].url} 
                    className="now-playing-cover" alt="" />

                <div className='playing-track-info'>
                    <div className="now-playing__name">{
                                current_track.name
                                }</div>

                    <div className="now-playing__artist">{
                                current_track.artists[0].name
                                }</div>
                </div>
                </div>
                : null}
                <div className='media-controls'>
                <button className="btn-spotify" onClick={() => { player.previousTrack() }} >
    &lt;&lt;
</button>

{/* <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
    { is_paused ? "PLAY" : "PAUSE" }
</button> */}

<button className="btn-spotify" onClick={() => { player.togglePlay() }} >
    { is_paused ? "PLAY" : "PAUSE" }
</button>

<button className="btn-spotify" onClick={() => { player.nextTrack() }} >
    &gt;&gt;
</button>
</div>
            </div>
    </>
)
}

export default WebPlayback
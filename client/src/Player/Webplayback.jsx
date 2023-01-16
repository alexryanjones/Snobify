import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTrack } from '../Redux/currentTrack';
import { setPlayState } from '../Redux/currentPlayState';
import { setDeviceId } from '../Redux/deviceId';


import playSVG from '../assets/playPlayer.svg'
import pauseSVG from '../assets/pausePlayer.svg'
import back from '../assets/backwards.svg'
import skip from '../assets/forwards.svg'




function WebPlayback() {
    const { token } = useSelector((state) => state.accessToken);
    // const { currentPlayState } = useSelector((state) => state.currentPlayState);
    const currentTrack = useSelector((state) => state.currentTrack);
    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(currentTrack);
    // const { deviceId } = useSelector((state) => state.deviceId);
    const dispatch = useDispatch()


    useEffect(() => {

    setCurrentTrack(currentTrack)
    setActive(true)
    console.log(currentTrack.artist, 'info should be here');
    }, [currentTrack])


useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {

        const player = new window.Spotify.Player({
            name: 'Snobify',
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

    return (
    <>
        <div className="player">
            {current_track.name? 
            <div className='playing-track'>
                <img src={current_track.album.images[0].url} className="now-playing-cover" alt="" />
                <div className='playing-track-info'>
                    <div className="now-playing__name">{current_track.name}</div>
                    <div className="now-playing__artist">{current_track.artists[0].name}</div>
                </div>
            </div>
            : null}
            <div className='media-controls'>
                <img className="btn-spotify skip" src={back} alt='back' onClick={() => { player.previousTrack() }} />
                {is_paused ? <img className="btn-spotify" src={playSVG} alt='play' onClick={() => { player.togglePlay() }}/> : <img className="btn-spotify" src={pauseSVG} alt='pause' onClick={() => { player.togglePlay() }}/>}
                <img className="btn-spotify skip" src={skip} onClick={() => { player.nextTrack() }} />
            </div>
        </div>
    </>
)
}

export default WebPlayback
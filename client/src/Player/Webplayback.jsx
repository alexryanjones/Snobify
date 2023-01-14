import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setCurrentTrack } from '../Redux/currentTrack';
// import { setCurrentTrack } from '../Redux/currentTrack';

function WebPlayback(props) {
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const currentTrack = useSelector((state) => state.currentTrack);
  const [current_track, setTrack] = useState(currentTrack);
  const { token } = useSelector((state) => state.accessToken);

  useEffect(() => {
    setCurrentTrack(currentTrack)
    setActive(true)
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
    console.log('currentTrack', state.track_window.current_track);

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
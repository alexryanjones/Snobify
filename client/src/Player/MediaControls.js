import SpotifyPlayer from 'react-spotify-web-playback';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


function MediaControls (trackUri) {
  const { token } = useSelector((state) => state.accessToken);
  const { queue } = useSelector((state) => state.queue);
  const [play, setPlay] = useState(false);
  const [playingTrack, setPlayingTrack] = useState('')

  useEffect(() => {
    if (queue.length >= 1) {
      setPlayingTrack(queue[0])
    }
  }, [queue])

  useEffect(() => {
    setPlay(true)
  }, [playingTrack])


  if (!token) return null;
  return (
    <SpotifyPlayer
      token={token}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={playingTrack.uri ? [playingTrack.uri] : []}
      styles={{
        activeColor: '#fff',
        bgColor: '#121212',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
      }}
    />
    // <div id='player'>
    //   <div id='center'></div>
    //   <div id='media-controls'>
    //     <div id='track-controls'>Back Play Skip</div>
    //     <div id='track-seeking'>
    //       SEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEKING
    //     </div>
    //   </div>
    //   <div id='volume-controls'>
    //     VOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOLUME
    //   </div>
    // </div>
  );
}

export default MediaControls;
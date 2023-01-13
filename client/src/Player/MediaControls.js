import SpotifyPlayer from 'react-spotify-web-playback';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQueue } from '../Redux/queue';
import { setPlayState } from '../Redux/currentPlayState';



function MediaControls (trackUri) {
  const { token } = useSelector((state) => state.accessToken);
  const { queue } = useSelector((state) => state.queue);
  const { currentPlayState } = useSelector((state) => state.currentPlayState);
  const [playingTrack, setPlayingTrack] = useState('');
  const baseUrl = 'http://localhost:4000/';
  const dispatch = useDispatch()


  useEffect(() => {
    if (queue.length >= 1) {
      setPlayingTrack(queue[0])
    }
  }, [queue])

  useEffect(() => {
    axios
      .post(baseUrl + 'get-queue', {
        data: {
          accessToken: token,
        },
      })
      .then((res) => {
        dispatch(setQueue(res.data));
      });
  }, [currentPlayState]);

  useEffect(() => {
    dispatch(setPlayState(true));
  }, [])


  if (!token) return null;
  return (
    <SpotifyPlayer
      token={token}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) dispatch(setPlayState(false));
      }}
      play={currentPlayState}
      uris={playingTrack.uri ? [playingTrack.uri] : []}
      styles={{
        activeColor: '#fff',
        bgColor: '#121212',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
        height: '10%',
      }}
    />
  );
}

export default MediaControls;
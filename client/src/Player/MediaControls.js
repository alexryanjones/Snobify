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
  const baseUrl = 'http://localhost:4000/';
  const dispatch = useDispatch()


  useEffect(() => {
    console.log('media controls loaded');
    axios
      .post(baseUrl + 'get-queue', {
        data: {
          accessToken: token,
        },
      })
      .then((res) => {
        console.log('this will set the queue', res.data);
        dispatch(setQueue(res.data));
      });
  }, [currentPlayState]);


  if (!token) return null;
  return (
    <SpotifyPlayer
      token={token}
      showSaveIcon
      callback={(state) => {
        // state.isPlaying = currentPlayState;
        if (!state.isPlaying) dispatch(setPlayState(false));
        if (state.isPlaying) dispatch(setPlayState(true));
      }}
      play={currentPlayState}
      uris={queue[0] ? [queue[0].uri] : []}
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
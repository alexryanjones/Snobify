import SpotifyPlayer from 'react-spotify-web-playback';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQueue } from '../Redux/queue';
import { setPlayState } from '../Redux/currentPlayState';



function MediaControls (trackUri) {
  const { token } = useSelector((state) => state.accessToken);
  // const { queue } = useSelector((state) => state.queue);
  const { currentPlayState } = useSelector((state) => state.currentPlayState);
  const baseUrl = 'http://localhost:4000/';
  const dispatch = useDispatch()


  useEffect(() => {
    try {
      axios
        .post(baseUrl + 'get-queue', {
          data: {
            accessToken: token,
          },
        })
        .then((res) => {
          dispatch(setQueue(res.data));
        });
    } catch (err) {
      console.log(err);
    }
  }, [currentPlayState]);


  if (!token) return null;
  return (
    (
      <SpotifyPlayer
        token={token}
        showSaveIcon
        callback={(state) => {
          state.isPlaying = currentPlayState;
          if (!state.isPlaying) dispatch(setPlayState(false));
          if (state.isPlaying) dispatch(setPlayState(true));
        }}
        play={currentPlayState}
        uris={trackUri ? [trackUri] : []}
        name='Snobify'
        styles={{
          activeColor: '#fff',
          bgColor: '#121212',
          color: '#fff',
          loaderColor: '#fff',
          sliderColor: '#1cb954',
          sliderHandleBorderRadius: '50%',
          sliderHandleColor: '#969696',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff',
          height: '5%',
        }}
      />
    ) || <></>
  );
}

export default MediaControls;
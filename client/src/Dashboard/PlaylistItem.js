import { useDispatch, useSelector } from 'react-redux';
import { moveToQueueFront } from '../Redux/queue';
import { setCurrentTrack } from '../Redux/currentTrack';
import { setPlayState } from '../Redux/currentPlayState';
import axios from 'axios';
import React from 'react';


function PlaylistItem({ track }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.accessToken);
  const { deviceId } = useSelector((state) => state.deviceId);

  // Format track duration
  const millisecondsToMinutes =
    Math.floor(track.duration / 60000) +
    ':' +
    (((track.duration % 60000) / 1000).toFixed(0) < 10 ? '0' : '') +
    ((track.duration % 60000) / 1000).toFixed(0);

    const handlePlay = async () => {
      console.log('track from playlist', track);
    try {
      await axios.put(
        
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {"uris": [`${track.uri}`]},
        {
          headers:
          {'Authorization': `Bearer ${token}`}
        },
      
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className='track-container'
      onClick={() => {
        dispatch(setCurrentTrack(track));
        // dispatch(moveToQueueFront(track));
        dispatch(setPlayState(true));
        handlePlay()

      }}
    >
      <div className='track-id'>{track.id}</div>
      <img id='playlist-item-artwork' src={track.artwork} alt='album artwork' />
      <div className='playlist-item-track-info'>
        <div className='playlist-item-track-title'>{track.title}</div>
        <div>{track.artist}</div>
      </div>
      <div>{track.album}</div>
      <div>{millisecondsToMinutes}</div>
    </div>
  );
}

export default PlaylistItem;

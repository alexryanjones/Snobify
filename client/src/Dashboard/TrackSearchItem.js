import playSVG from '../assets/play.svg'
import queueSVG from '../assets/queue.svg'
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveToQueueFront, addToQueue } from '../Redux/queue';
import { setPlayState } from '../Redux/currentPlayState';
import { setCurrentTrack } from '../Redux/currentTrack';


function TrackSearchItem ({track}) {
  const baseUrl = 'http://localhost:4000/';
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.accessToken);
  const { deviceId } = useSelector((state) => state.deviceId);
  const { queue } = useSelector((state) => state.queue);


  // ADD TO QUEUE FUNCTION HERE!!!!!!!

  const addToQueue = () => {
    try {
      axios.post(baseUrl + 'add-to-queue', {
        data: {
          accessToken: token,
          trackUri: track.uri,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handlePlay = async () => {
    try {
      
      await axios.put(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        // { uris: queue },
        { uris: [`${track.uri}`] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='search-result-item'>
      <img className='search-artwork' src={track.artwork} alt='albumArt' />
      <div className='track-info'>
        <div className='search-track-name'>{track.title}</div>
        <div className='search-artist-name'>{track.artist}</div>
        <div className='search-album-name'>{track.album}</div>
      </div>
      <div className='play-queue-icon'>
        <img
          className='queue'
          src={queueSVG}
          alt='queueSVG'
          onClick={() => {
            addToQueue();
            dispatch(addToQueue(track.uri))
          }}
        />
        <img
          className='play'
          src={playSVG}
          alt='playSVG'
          onClick={() => {
            dispatch(setCurrentTrack(track))
            // dispatch(moveToQueueFront(track));
            dispatch(setPlayState(true));
            handlePlay()
          }}
        />
      </div>
    </div>
  );
}

export default TrackSearchItem;
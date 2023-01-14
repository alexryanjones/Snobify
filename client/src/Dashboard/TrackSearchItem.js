import playSVG from '../assets/play.svg'
import queueSVG from '../assets/queue.svg'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { moveToQueueFront } from '../Redux/queue';
import { setPlayState } from '../Redux/currentPlayState';
// import { getQueue } from '../ApiService';


function TrackSearchItem ({track}) {
  const baseUrl = 'http://localhost:4000/';
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.accessToken);

  // ADD TO QUEUE FUNCTION HERE!!!!!!!

  const getQueue = () => {
    try {
    console.log(track);
    axios
      .post(baseUrl + 'get-queue', {
        data: {
          accessToken: token,
        },
      })
      .then((res) => res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addToQueue = () => {
    try {
      console.log(track);
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
          }}
        />
        <img
          className='play'
          src={playSVG}
          alt='playSVG'
          onClick={() => {
            dispatch(moveToQueueFront(track));
            dispatch(setPlayState(true));
          }}
        />
      </div>
    </div>
  );
}

export default TrackSearchItem;
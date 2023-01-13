import playSVG from '../assets/play.svg'
import queueSVG from '../assets/queue.svg'
import { useDispatch, useSelector } from 'react-redux';
import { moveToQueueFront, setQueue } from '../Redux/queue';
import { setPlayState } from '../Redux/currentPlayState';
import { getQueue } from '../ApiService';


function TrackSearchItem ({track}) {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.accessToken);

  return (
    <div className='search-result-item'>
      <img src={track.albumUrl} alt='albumArt' />
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
            console.log(track);
            getQueue(token, track.uri).then((res) => dispatch(setQueue(res)));
          }}
        />
        <img
          className='play'
          src={playSVG}
          alt='playSVG'
          onClick={() => {
            console.log('play');
            dispatch(moveToQueueFront(track));
            dispatch(setPlayState(true));
          }}
        />
      </div>
    </div>
  );
}

export default TrackSearchItem;
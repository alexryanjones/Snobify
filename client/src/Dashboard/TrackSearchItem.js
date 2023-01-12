import playSVG from '../assets/play.svg'
import queueSVG from '../assets/queue.svg'
import { useDispatch } from 'react-redux';
import { addToQueue, play } from '../Redux/queue';


function TrackSearchItem ({track}) {
  const dispatch = useDispatch()

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
          onClick={() => dispatch(addToQueue(track))}
        />
        <img
          className='play'
          src={playSVG}
          alt='playSVG'
          onClick={() => dispatch(play(track))}
        />
      </div>
    </div>
  );
}

export default TrackSearchItem;
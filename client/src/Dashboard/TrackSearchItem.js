import playSVG from '../assets/play.svg'
import queueSVG from '../assets/queue.svg'
import { useDispatch } from 'react-redux';
import { setCurrentlySelectedTrack } from '../Redux/currentlySelectedTrack';

function TrackSearchItem ({track}) {
  const dispatch = useDispatch();

  return (
    <div className='search-result-item'>
      <img src={track.albumUrl} alt='albumArt' />
      <div className='track-info'>
        <div className='search-track-name'>{track.title}</div>
        <div className='search-artist-name'>{track.artist}</div>
        <div className='search-album-name'>{track.album}</div>
      </div>
      <img className='play-queue-icon queue' src={queueSVG} alt='queueSVG' />
      <img
        className='play-queue-icon play'
        src={playSVG}
        alt='playSVG'
        onClick={() => dispatch(setCurrentlySelectedTrack(track))}
      />
    </div>
  );
}

export default TrackSearchItem;
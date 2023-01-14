import { useDispatch } from 'react-redux';
import { setCurrentView } from '../Redux/currentView';

function FeaturedPlaylistItem({ playlist }) {
  const dispatch = useDispatch();

  return (
    <div
      className='playlist-tile'
      onClick={() => dispatch(setCurrentView(playlist))}
    >
      <img
        className='playlist-artwork'
        src={playlist.playlistArtwork}
        alt='playlist-cover'
      />
      <div className='playlist-title'>{playlist.playlistName}</div>
      <div className='playlist-description'>{playlist.playlistDescription}</div>
    </div>
  );
}
export default FeaturedPlaylistItem;

import { useDispatch } from 'react-redux';
import { setCurrentView } from '../Redux/currentView';



function Playlists ({playlists}) {
  const dispatch = useDispatch()
  console.log('user playlists', playlists);

  return (
    <div id='playlists'>
      
      {playlists.length > 0 ? playlists.map(playlist => {
        return (
          <p
            className='sidebar-item playlist-item'
            key={playlist.playlistName}
            onClick={() => dispatch(setCurrentView(playlist))}
          >
            {playlist.playlistName}
          </p>
        );
      }) : <p>Loading</p>}
    </div>
  );
}

export default Playlists;
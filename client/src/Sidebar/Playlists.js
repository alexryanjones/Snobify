import { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentView } from '../Redux/currentView';



function Playlists ({ baseUrl}) {
  const [playlists, setPlaylists] = useState([]);
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.accessToken);
  // Example
  // const { getPlaylists, postSong } = useAPI();
  // getPlaylists();
  // postSong(data);


  // Get playlists
  useEffect(() => {
    if (token) {
      axios({
        method: 'post',
        url: baseUrl + 'my-playlists',
        data: {
          accessToken: token,
        },
      }).then((res) => {
        setPlaylists(res.data);
      });
    }
  }, [token]);

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
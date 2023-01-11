import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';


function Playlists ({ baseUrl}) {
  const [playlists, setPlaylists] = useState([]);
  const { token } = useSelector((state) => state.accessToken);


  // Get playlists
  useEffect(() => {
    if (token) {
      axios({
        method: 'post',
        url: baseUrl + 'playlists',
        data: {
          accessToken: token,
        },
      }).then((res) => setPlaylists(res.data))
    }
  }, [token]);

  return (
    <div id='playlists'>
      
      {playlists.length > 0 ? playlists.map(playlist => {
        return (
          <p className='sidebar-item playlist-item' key={playlist.playlistName}>
            {playlist.playlistName}
          </p>
        );
      }) : <p>Loading</p>}
    </div>
  );
}

export default Playlists;
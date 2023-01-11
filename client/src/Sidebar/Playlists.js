import { useEffect, useState } from "react";
import axios from 'axios';


function Playlists ({token, baseUrl}) {
  const [playlists, setPlaylists] = useState([]);


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
      .then(() => console.log(playlists));
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
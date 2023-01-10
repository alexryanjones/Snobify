import { useEffect, useState } from "react";
import axios from 'axios';


function Playlists ({token, baseUrl}) {
  const [playlists, setPlaylists] = useState({});


  // Get playlists
  useEffect(() => {
    if (token) {
      axios({
        method: 'post',
        url: baseUrl + 'playlists',
        data: {
          accessToken: token,
        },
      }).then((res) => {
        console.log(res.data);
        setPlaylists(res.data)
      });
    }
  }, [token]);

  return (
    <div className='playlists'>
      {playlists.map(playlist => {
        return <p key={playlist.playlistName}>{playlist.playlistName}</p>;
      })}
    </div>
  );
}

export default Playlists;
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import PlaylistItem from './PlaylistItem';

function PlaylistView ({playlist}) {
  const baseUrl = 'http://localhost:4000/';
  const { token } = useSelector((state) => state.accessToken);
  const [playlistTracks, setPlaylistTracks] = useState([])

    useEffect(() => {
      if (token) {
        axios({
          method: 'post',
          url: baseUrl + 'get-playlist',
          data: {
            playlistId: playlist.playlistId,
            accessToken: token,
          },
        }).then((res) => {
          setPlaylistTracks(res.data);
        });
      }
    }, [token]);

  return (
    <div id='list-container'>
      <h2>{playlist.playlistName}</h2>
      {playlistTracks.map((track) => (
        <PlaylistItem track={track} />
      ))}
    </div>
  );
};

export default PlaylistView;
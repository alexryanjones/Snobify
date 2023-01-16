import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import PlaylistItem from './PlaylistItem';
// import currentView from "../Redux/currentView";
import React from 'react';


function PlaylistView ({playlist}) {
  const baseUrl = 'http://localhost:4000/';
  const { token } = useSelector((state) => state.accessToken);
  const [playlistTracks, setPlaylistTracks] = useState([])

    useEffect(() => {
      try {
      if (token && playlist.playlistName !== 'Your Library') {
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
      } else if (token && playlist.playlistName === 'Your Library') {
        axios({
          method: 'post',
          url: baseUrl + 'get-library',
          data: {
            accessToken: token,
          },
        }).then((res) => {
          setPlaylistTracks(res.data);
        });
      }
    } catch (err) {
      console.log(err);
    }
    }, [token, playlistTracks]);

  return (
    <div className='list-container'>
      <h1 className='playlist-title'>{playlist.playlistName}</h1>
      <div id='playlist-info-header'>
        <div style={{ gridColumnStart: 1 }}>#</div>
        <div style={{ gridColumnStart: 3 }}>TITLE</div>
        <div style={{ gridColumnStart: 4 }}>ALBUM</div>
        <div style={{ gridColumnStart: 5 }}>DURATION</div>
      </div>
      {playlistTracks.map((track) => (
        <PlaylistItem track={track} key={track.id} />
      ))}
    </div>
  );
}

export default PlaylistView;
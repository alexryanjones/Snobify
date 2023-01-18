import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import PlaylistItem from './PlaylistItem';
// import currentView from "../Redux/currentView";
import React from 'react';
import clock from "../assets/clock.svg"


function PlaylistView ({playlist}) {
  const baseUrl = 'http://localhost:4000/';
  const { token } = useSelector((state) => state.accessToken);
  const [playlistTracks, setPlaylistTracks] = useState([])

  //  Get tracks of selected playlist
  useEffect(() => {
      try {
      const getPlaylists = async () => {
        if (token && playlist.playlistName !== 'Your Library') {
          const response = await axios({
            method: 'post',
            url: baseUrl + 'get-playlist',
            data: {
              playlistId: playlist.playlistId,
              accessToken: token,
            },
          })
          setPlaylistTracks(response.data);
        
        } else if (token && playlist.playlistName === 'Your Library') {
          const response = await axios({
            method: 'post',
            url: baseUrl + 'get-library',
            data: {
              accessToken: token,
            },
          })
            setPlaylistTracks(response.data);
        }
    } 
    getPlaylists()
    } catch (err) {
      window.alert('Could not get playlists: ', err);
    }
  }, [token, playlist]);

  return (
    <div className='list-container'>
      <h1 className='playlist-title'>{playlist.playlistName}</h1>
      <div id='playlist-info-header'>
        <div style={{ gridColumnStart: '1' }}>#</div>
        <div style={{ gridColumnStart: '3' }}>TITLE</div>
        <div style={{ gridColumnStart: '4', /* paddingLeft: '12.5px' */ }}>ALBUM</div>
        <img src={clock} alt="clock" style={{ gridColumnStart: '5', height: '20px', paddingLeft: '5px' }}/>
      </div>
      {playlistTracks.map((track) => (
        <PlaylistItem track={track} key={track.id} />
      ))}
    </div>
  );
}

export default PlaylistView;
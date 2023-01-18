import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FeaturedPlaylistItem from "./FeaturedPlaylistItem";
import React from 'react';


function FeaturedPlaylists() {
  const baseUrl = 'http://localhost:4000/';
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const { token } = useSelector((state) => state.accessToken);
  const { currentView } = useSelector((state) => state.currentView);


  // Get featured playlists 
  useEffect(() => {
    if (token) {
      try {
      axios({
        method: 'post',
        url: baseUrl + 'featured-playlists',
        data: {
          accessToken: token,
        },
      }).then((res) => {
        setFeaturedPlaylists(res.data);
      });
    } catch (err) {
      console.log(err);
    }
    }
  }, [token, currentView]);

  return (
    <div className='list-container'>
      <h2 className='playlist-title'>Good morning</h2>
      <div id='list-items'>
        {featuredPlaylists.map((playlist) => (
          <FeaturedPlaylistItem playlist={playlist} key={playlist.playlistUri} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedPlaylists;
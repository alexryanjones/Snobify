import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function DashboardHome () {
  const [featuredPlaylists, setFeaturedPlaylists] = useState([])
  const { token } = useSelector((state) => state.accessToken);


  useEffect(() => {
    
  })



  return (
    <div id='list-container'>
      <h2 className='tile-title'>Good morning</h2>
      <div id='list-items'>
        <div className='playlist-tile'>
          <div className='playlist-artwork'>cover</div>
          <h3>Playlist name</h3>
          <h4>Artist</h4>
        </div>
        <div className='playlist-tile'>
          <div className='playlist-artwork'>cover</div>
          <h3>Playlist name</h3>
          <h4>Artist</h4>
        </div>
        <div className='playlist-tile'>
          <div className='playlist-artwork'>cover</div>
          <h3>Playlist name</h3>
          <h4>Artist</h4>
        </div>
        <div className='playlist-tile'>
          <div className='playlist-artwork'>cover</div>
          <h3>Playlist name</h3>
          <h4>Artist</h4>
        </div>
        <div className='playlist-tile'>
          <div className='playlist-artwork'>cover</div>
          <h3>Playlist name</h3>
          <h4>Artist</h4>
        </div>
        <div className='playlist-tile'>
          <div className='playlist-artwork'>cover</div>
          <h3>Playlist name</h3>
          <h4>Artist</h4>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome
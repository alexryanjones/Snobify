import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FeaturedPlaylistItem from "./FeaturedPlaylistItem";

function DashboardHome () {
  const baseUrl = 'http://localhost:4000/';
  const [featuredPlaylists, setFeaturedPlaylists] = useState([])
  const { token } = useSelector((state) => state.accessToken);


  useEffect(() => {
    if (token) {
      axios({
        method: 'post',
        url: baseUrl + 'featured-playlists',
        data: {
          accessToken: token,
        },
      }).then((res) => {
        setFeaturedPlaylists(res.data)
        console.log(featuredPlaylists);
      });
    }
  }, [token]);



  return (
    <div id='list-container'>
      <h2 className='tile-title'>Good morning</h2>
      <div id='list-items'>
        {featuredPlaylists.map((playlist) => (
        <FeaturedPlaylistItem playlist={playlist} key={playlist.uri}/>
        ))}        
      </div>
    </div>
  );
}

export default DashboardHome
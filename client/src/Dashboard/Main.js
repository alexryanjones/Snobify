import { Form } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import UseAuth from "../Login/UseAuth";
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: '3da6dc947ad845449ce3be18572218b8',
});

function DashboardMain ({code}) {
  const accessToken = UseAuth(code);
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([]);

  // Maybe add another dashboard view for the search results?

  useEffect(() => {
    if (!accessToken) return 
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi.searchTracks(search)
      .then(res => {
        console.log(res.body.tracks);
        setSearchResults(res.body.tracks)
      })
      .then(() => console.log('here you go', searchResults))

  }, [accessToken, search])

  return (
    <div className='dashboard'>
      <Form.Control
        id='search'
        type='search'
        placeholder='Search'
        value={search}
        onChange={e => setSearch(e.target.value)}
        ></Form.Control>
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
    </div>
  );
}

export default DashboardMain;
import { Container, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import UseAuth from "../Login/UseAuth";
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchItem from './TrackSearchItem';

const spotifyApi = new SpotifyWebApi({
  clientId: '3da6dc947ad845449ce3be18572218b8',
});

function DashboardMain ({code}) {
  const accessToken = UseAuth(code);
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([]);
  console.log('here results', searchResults);

  // Maybe add another dashboard view for the search results?

  useEffect(() => {
    if (!accessToken) return 
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    // cancels request if another request is made before promise is resolved
    let cancel = false;
    spotifyApi.searchTracks(search)
      .then(res => {
        if (cancel) return;
        // console.log('all the items',res.body.tracks.items);
        const searchResultItems = res.body.tracks.items.map(track => {
          // return console.log(track);
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url
          }
        })
        console.log('searchyres', searchResultItems);
        setSearchResults(searchResultItems);
        })
    
      return () => cancel = true;

  }, [accessToken, search])

  return (
    <div className='dashboard'>
      <Container
        className='d-flex flex-column py-2'
        style={{ height: '100vh' }}
      >
        <Form.Control
          style={{ width: '45%', position: 'absolute' }}
          id='search'
          type='search'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></Form.Control>
        <div className='flex-grow-1 my-2' style={{ overflowY: 'auto' }}>
          {searchResults.map((track) => (
            <TrackSearchItem track={track} key={track.uri} />
          ))}
        </div>
      </Container>
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
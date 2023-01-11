import { Container, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchItem from './TrackSearchItem';
import DashboardHome from './DashboardHome';

const spotifyApi = new SpotifyWebApi({
  clientId: '3da6dc947ad845449ce3be18572218b8',
});

function DashboardMain({ accessToken }) {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  console.log('here results', searchResults);

  // Maybe add another dashboard view for the search results?

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    // cancels request if another request is made before promise is resolved
    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      // console.log('all the items',res.body.tracks.items);
      const searchResultItems = res.body.tracks.items.map((track) => {
        console.log(track);
        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: track.album.images[2].url,
          album: track.album.name,
        };
      });
      console.log('searchyres', searchResultItems);
      setSearchResults(searchResultItems);
    });

    return () => (cancel = true);
  }, [accessToken, search]);

  return (
    <div id='dashboard'>
      <Container id='search-container'>
        <Form.Control
          id='search'
          type='search'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></Form.Control>
        <div id='search-results-container' style={{ overflowY: 'scroll' }}>
          {searchResults.map((track) => (
            <TrackSearchItem track={track} key={track.uri} />
          ))}
        </div>
      </Container>
      <DashboardHome />
    </div>
  );
}

export default DashboardMain;
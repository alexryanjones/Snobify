import { Form } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchItem from './TrackSearchItem';
import FeaturedPlaylists from './FeaturedPlaylists';
import PlaylistView from './PlaylistView';

const spotifyApi = new SpotifyWebApi({
  clientId: '3da6dc947ad845449ce3be18572218b8',
});

function DashboardMain() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { playlist } = useSelector((state) => state.currentView);
  const { token } = useSelector((state) => state.accessToken);


  // Maybe add another dashboard view for the search results?

  useEffect(() => {
    if (!token) return;
    spotifyApi.setAccessToken(token);
  }, [token]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!token) return;
    // cancels request if another request is made before promise is resolved
    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      const searchResultItems = res.body.tracks.items.map((track) => {
        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          artwork: track.album.images[0].url,
          album: track.album.name,
          popularity: track.popularity
        };
      });
      setSearchResults(searchResultItems);
    });

    return () => (cancel = true);
  }, [token, search]);

  return (
    <div id='dashboard'>
      <div id='search-container'>
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
      </div>
      {playlist.playlistName === 'Home' ? (
        <FeaturedPlaylists />
      ) : (
        <PlaylistView playlist={playlist} key={playlist.uri}/>
      )}
    </div>
  );
}

export default DashboardMain;
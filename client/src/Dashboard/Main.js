import { Form } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchItem from './TrackSearchItem';
import FeaturedPlaylists from './FeaturedPlaylists';
import PlaylistView from './PlaylistView';
import React from 'react';


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID
});

function DashboardMain() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { playlist } = useSelector((state) => state.currentView);
  const { token } = useSelector((state) => state.accessToken);

  // Set access token
  useEffect(() => {
    if (!token) return;
    try {
      spotifyApi.setAccessToken(token);
    } catch (err) {
      window.alert('Could not set access token: ', err);
    }
  }, [token]);

  // Handle search query
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!token) return;
    // cancels request if another request is made before promise is resolved
    try {
    let cancel = false;
    const searchTracks = async () => {
      const response = await spotifyApi.searchTracks(search)
      if (cancel) return;
      const searchResultItems = response.body.tracks.items.map((track) => {
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
      return () => (cancel = true);
    }
    searchTracks()

  } catch (err) {
    window.alert('Counld not search tracks: ', err)
  }
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
        <FeaturedPlaylists key={1}/>
      ) : (
        <PlaylistView playlist={playlist} key={playlist.uri}/>
      )}
    </div>
  );
}

export default DashboardMain;
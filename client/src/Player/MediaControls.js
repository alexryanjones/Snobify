import SpotifyPlayer from 'react-spotify-web-playback';
import { useSelector } from 'react-redux';


function MediaControls () {
  const { token } = useSelector((state) => state.accessToken);
  const { track } = useSelector((state) => state.currentlySelectedTrack);
  const trackUri = track.uri;

  if (!token) return null;
  return (
    <SpotifyPlayer
      id='player'
      token={token}
      showSaveIcon
      uris={trackUri ? trackUri : []}
      styles={{
        activeColor: '#fff',
        bgColor: '#121212',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#969696',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
      }}
    />
  );
}

export default MediaControls;
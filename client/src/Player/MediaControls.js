import SpotifyPlayer from 'react-spotify-web-playback';
import { useSelector } from 'react-redux';


function MediaControls (trackUri) {
  const { token } = useSelector((state) => state.accessToken);


  if (!token) return null;
  return (
    <SpotifyPlayer
      token={token}
      showSaveIcon
      uris={trackUri ? [trackUri] : []}
      styles={{
        activeColor: '#fff',
        bgColor: '#121212',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
      }}
    />
    // <div id='player'>
    //   <div id='center'></div>
    //   <div id='media-controls'>
    //     <div id='track-controls'>Back Play Skip</div>
    //     <div id='track-seeking'>
    //       SEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEKING
    //     </div>
    //   </div>
    //   <div id='volume-controls'>
    //     VOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOLUME
    //   </div>
    // </div>
  );
}

export default MediaControls;
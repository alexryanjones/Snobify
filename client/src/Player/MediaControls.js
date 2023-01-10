// import SpotifyPlayer from 'react-spotify-web-player';
import { useSelector } from 'react-redux';


function MediaControls () {

  const { token } = useSelector((state) => state.accessToken);

  if (!token) return null;
  return (
    // <SpotifyPlayer 
    // token={token}
    // showSaveIcon
    // uris={trackUri ? [trackUri] : []}
    // />
    <div id='player'>
      <div id='center'></div>
      <div id='media-controls'>
        <div id='track-controls'>Back Play Skip</div>
        <div id='track-seeking'>
          SEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEKING
        </div>
      </div>
      <div id='volume-controls'>
        VOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOLUME
      </div>
    </div>
  );
}

export default MediaControls;
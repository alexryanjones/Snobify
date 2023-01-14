import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

function CurrentlyPlaying({ currentTrack }) {
  const baseUrl = 'http://localhost:4000/';
  const [insult, setInsult] = useState('');
  // const { token } = useSelector((state) => state.accessToken);
  const { user } = useSelector((state) => state.currentUser);
  const { currentPlayState } = useSelector((state) => state.currentPlayState);
  // const { queue } = useSelector((state) => state.queue);
  // const [currentTrack, setCurrentTrack] = useState(queue[0])
  // console.log('queue', queue);
  console.log(currentTrack, 'from CurrentlyPlaying');

  useEffect(() => {
    // try {
    if (currentTrack) {
      axios({
        method: 'post',
        url: baseUrl + 'generate-insult',
        data: {
          trackInfo: currentTrack.track,
          userInfo: user,
        },
      }).then((res) => {
        setInsult(res.data);
      });
    }
    // } catch (err) {
    //   console.log(err);
    // }
  }, [currentTrack, currentPlayState]);

  return (
    <div id='currently-playing'>
      <h3 id='currently-playing-title' className='currently-playing-content'>
        Currently Playing
      </h3>
      <div id='track-info' className='currently-playing-content'>
        <h4>{currentTrack.track.title}</h4>
        <h5>{currentTrack.track.artist}</h5>
      </div>
      <img
        id='currently-playing-artwork'
        src={currentTrack.track.artwork}
        alt='artwork'
      />
      <div id='judgement-container'>{insult ? <p>{insult}</p> : null}</div>
    </div>
  );
}

export default CurrentlyPlaying;
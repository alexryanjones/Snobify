import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

function CurrentlyPlaying () {
    const baseUrl = 'http://localhost:4000/';
    // const [currentlyPlaying, setCurrentlyPlaying] = useState({})
    const [insult, setInsult] = useState('')
    const { token } = useSelector((state) => state.accessToken);
    const { user } = useSelector((state) => state.currentUser)
    const { currentPlayState } = useSelector((state) => state.currentPlayState);
    const { queue } = useSelector((state) => state.queue);
    const [currentTrack, setCurrentTrack] = useState(queue[0])
    console.log('queue', queue);

    // useEffect(() => {
    //   if (queue[0] !== 'undefined') {
    //     console.log('current', queue[0]);
    //     axios({
    //       method: 'post',
    //       url: baseUrl + 'generate-insult',
    //       data: {
    //         trackInfo: queue[0],
    //         userInfo: user
    //       },
    //     }).then((res) => {
    //       setInsult(res.data);
    //     });
    //   }
    // }, [queue])

    useEffect(() =>{
      setCurrentTrack(queue[0])
    }, queue[0])

        useEffect(() => {
          if (currentPlayState && queue.length > 0) {
            axios({
              method: 'post',
              url: baseUrl + 'generate-insult',
              data: {
                trackInfo: queue[0],
                userInfo: user,
              },
            }).then((res) => {
              setInsult(res.data);
            });
          }
        }, [queue]);
    
    return (
      <div id='currently-playing'>
        <h3 id='currently-playing-title' className='currently-playing-content'>
          Currently Playing
        </h3>
        <div id='track-info' className='currently-playing-content'>
          <h4>{queue[0].title}</h4>
          <h5>{queue[0].artist}</h5>
        </div>
        <img id='currently-playing-artwork' src={queue[0].artwork} alt='artwork' />
        <div id='judgement-container'>
          {insult ? <p>{insult}</p> : null}
        </div>
      </div>
    );
}

export default CurrentlyPlaying;
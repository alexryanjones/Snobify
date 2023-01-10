import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

function CurrentlyPlaying () {
    const baseUrl = 'http://localhost:4000/';
    const [currentlyPlaying, setCurrentlyPlaying] = useState({})
    const { token } = useSelector((state) => state.accessToken);

    useEffect(() => {
      if(token) {
        axios({
        method: 'post',
        url: baseUrl + 'now-listening',
        data: {
          accessToken: token,
        }
      })
          .then((res) => console.log(res.data));
      }

    }, [token])

  return (
    <div id='currently-playing'>
      <h1 id='currently-playing-title' className='currently-playing-content'>
        Currently Playing
      </h1>
      <div id='track-info' className='currently-playing-content'>
        <h1>Track name</h1>
        <h2>Artist</h2>
      </div>
      <div id='currently-playing-artwork'></div>
      <div id='judgement-container'>
        <p>
          Really? Taylor Swift for the 5th time this week? I’ve gone ahead and
          changed your name to Jessica. Listen to 10 tracks by artists outside
          of the top 1000 to get your name back. In the meantime, enjoy your
          pumpkin spiced latte, Jessica.
        </p>
      </div>
    </div>
  );
}

export default CurrentlyPlaying;
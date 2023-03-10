import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import React from 'react';


function CurrentlyPlaying({ currentTrack }) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [insult, setInsult] = useState('');
  const { user } = useSelector((state) => state.currentUser);

  // Populate track judgement
  useEffect(() => {
    try {
      const generateInsult = async () => {
        const response = await axios({
          method: 'post',
          url: baseUrl + 'generate-insult',
          data: {
            trackInfo: currentTrack,
            userInfo: user,
          },
        })
        setInsult(response.data);
      };
      generateInsult();
    } catch (err) {
      window.alert('Could not generate insult, consider yourself lucky: ', err)
    }
  }, [currentTrack]);

  return (
    <div id='currently-playing'>
      <h3 id='currently-playing-title' className='currently-playing-content'>
        Currently Playing
      </h3>
      <div id='track-info' className='currently-playing-content'>
        <h4>{currentTrack.title}</h4>
        <h5>{currentTrack.artist}</h5>
      </div>
      <img
        id='currently-playing-artwork'
        src={currentTrack.artwork}
        alt='artwork'
      />
      <div id='judgement-container'>
        {insult ? <p className='judgement-text typing'>{insult}</p> : null}
      </div>
    </div>
  );
}

export default CurrentlyPlaying;
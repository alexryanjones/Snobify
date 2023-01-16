import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import React from 'react';


function CurrentlyPlaying({ currentTrack }) {
  const baseUrl = 'http://localhost:4000/';
  const [insult, setInsult] = useState('');
  const [currentText, setCurrentText] = useState('');
  const { user } = useSelector((state) => state.currentUser);
  const { currentPlayState } = useSelector((state) => state.currentPlayState);
  let i = 0;

  // const { queue } = useSelector((state) => state.queue);

  useEffect(() => {
    // try {
      console.log(currentTrack);
      axios({
        method: 'post',
        url: baseUrl + 'generate-insult',
        data: {
          trackInfo: currentTrack,
          userInfo: user,
        },
      }).then((res) => {
        setInsult(res.data);
      });
  }, [currentTrack]);

      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentText(insult.slice(0, i));
          i++;
        }, 35);
        return () => clearInterval(interval);
      }, [insult]);

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
      <div id='judgement-container' className='typing-text'>
        {insult ? <p className='judgement-text'>{insult}</p> : null}
      </div>
    </div>
  );
}

export default CurrentlyPlaying;
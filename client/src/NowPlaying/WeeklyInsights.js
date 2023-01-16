import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';


function WeeklyInsights () {
  const baseUrl = 'http://localhost:4000/';
  const [topTrack, setTopTrack] = useState('')
  const [topArtist, setTopArtist] = useState('');
  const [uniqueArtists, setUniqueArtists] = useState('');
  const [repeatedTracksPercentage, setRepeatedTracksPercentage] = useState('')
  const [explicitPercentage, setExplicitPercentage] = useState('')
  const [topYear, setTopYear] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [insightsText, setInsightsText] = useState([])
  let i = 0;

    
    
    useEffect(() => {
      try {
        axios.get(baseUrl + 'analyse-history')
        .then(res => {
          console.log(res.data.explicitPercentage);
          setTopTrack(`Your top song was ${res.data.topTrack._id} with ${res.data.topTrack.count} plays.`);
          setTopArtist(`Your most listened to artist was ${res.data.topArtist._id}. You played ${res.data.topArtist.count} of their songs.`)
          setUniqueArtists(`You listened to ${res.data.uniqueArtistCount} unique artists, that's ${res.data.uniqueArtistPercentage}% of your weekly listens!`)
          setRepeatedTracksPercentage(`${res.data.repeatedTracksPercentage}% of the songs you listened to were songs you'd already heard before.`)
          setExplicitPercentage(`${res.data.explicitPercentage}% of your songs contained explicit material.`)
          setTopYear(`You listened to ${res.data.topYear.count} songs released in ${res.data.topYear._id}, more than any other year.`)
      }).then(() => {
        setInsightsText([topTrack, topArtist,uniqueArtists,repeatedTracksPercentage,explicitPercentage,topYear]);
      })} catch (err) {
        console.log(err);
      }
    }, [])
    
    // // Type top track
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentText(insightsText.join('\n').slice(0, i));
        i++;
      }, 35);
      return () => clearInterval(interval);
    }, [insightsText]);


  return (
    <div id='weekly-stats'>
      {/* <h2>This week you listened to</h2> */}
      <h2>Your weekly insights</h2>
      <div>{topTrack}</div>
      <div>{topArtist}</div>
      <div>{uniqueArtists}</div>
      <div>{repeatedTracksPercentage}</div>
      <div>{explicitPercentage}</div>
      <div>{topYear}</div>
    </div>
  );
}

export default WeeklyInsights;
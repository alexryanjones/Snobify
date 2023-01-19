import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
;


function HistoryAnalysis () {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [topTrack, setTopTrack] = useState('')
  const [topArtist, setTopArtist] = useState('');
  const [uniqueArtists, setUniqueArtists] = useState('');
  const [repeatedTracksPercentage, setRepeatedTracksPercentage] = useState('')
  const [explicitPercentage, setExplicitPercentage] = useState('')
  const [topYear, setTopYear] = useState('');

    // Get weekly insights
    useEffect(() => {
      try {
        const getInsights = async () => { 
          const res = await axios.get(baseUrl + 'analyse-history')

          setTopTrack(`Your top song was ${res.data.topTrack.title} by ${res.data.topTrack.artist} with ${res.data.topTrack.count} plays.`);
          setTopArtist(`Your most listened to artist was ${res.data.topArtist._id}. You played ${res.data.topArtist.count} of their songs.`)
          setUniqueArtists(`You listened to ${res.data.uniqueArtistCount} unique artists, that's ${res.data.uniqueArtistPercentage}% of your weekly listens!`)
          setRepeatedTracksPercentage(`${res.data.repeatedTracksPercentage}% of the songs you listened to were songs you'd already heard before.`)
          setExplicitPercentage(`${res.data.explicitPercentage}% of your songs contained explicit material.`)
          setTopYear(`You listened to ${res.data.topYear.count} songs released in ${res.data.topYear._id}, more than any other year.`)
        }
        getInsights()
      } catch (err) {
        window.alert('Could not get insights: ', err)
      }
    }, [])

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

export default HistoryAnalysis;
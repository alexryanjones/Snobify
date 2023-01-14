import axios from "axios";
import { useEffect, useState } from "react";

function HistoryAnalysis () {
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
          setTopTrack(`Your top song of this week is ${res.data.topTrack._id} with ${res.data.topTrack.count} plays.`);
          setTopArtist(`Your most listened to artst this week is ${res.data.topArtist._id}. You played ${res.data.topArtist.count} of their songs.`)
          setUniqueArtists(`You listened to ${res.data.uniqueArtists.count} unique artists this week, that's ${Math.floor((res.data.uniqueArtists.count/res.data.totalTracks) * 100)}% of your weekly listens!`)
          setRepeatedTracksPercentage(`${Math.floor(res.data.repeatedTracks.duplicateCount / res.data.totalTracks * 100)} of the songs you listened to this week were songs you'd already heard before.`)
          setExplicitPercentage(`${(res.data.explicitPercentage.percentage / res.data.totalTracks) * 1000}% of your songs contained explicit material.`)
          setTopYear(`You listened to ${res.data.topYear.count} songs from ${res.data.topYear._id} this week, more than any other year.`)
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
        <div>{currentText}</div>
    </div>
  );
}

export default HistoryAnalysis;
import axios from "axios";
import { useEffect, useState } from "react";

function HistoryAnalysis () {
  const baseUrl = 'http://localhost:4000/';
  const [analysis, setAnalysis] = useState(null)
  const [topTrack, setTopTrack] = useState('')
  const [topArtist, setTopArtist] = useState('');
  const [uniqueArtists, setUniqueArtists] = useState('');
  const [repeatedTracksPercentage, setRepeatedTracksPercentage] = useState('')
  const [explicitPercentage, setExplicitPercentage] = useState('')
  const [topYear, setTopYear] = useState('');


  useEffect(() => {
    try {
    axios.get(baseUrl + 'analyse-history')
      .then(res => {
        console.log('analysis data', res.data);
        setAnalysis(res.data);
        setTopTrack(`Your top song of this week is ${res.data.topTrack._id} with ${res.data.topTrack.count} plays.`);
        setTopArtist(`Your most listened to artst this week is ${res.data.topArtist._id}. You played ${res.data.topArtist.count} of their songs.`)
        setUniqueArtists(`You listened to ${res.data.uniqueArtists.count} unique artists this week, that's ${Math.floor((res.data.uniqueArtists.count/res.data.totalTracks) * 100)}% of your weekly listens!`)
        setRepeatedTracksPercentage(`${Math.floor(res.data.repeatedTracks.duplicateCount / res.data.totalTracks * 100)} of the songs you listened to this week were songs you'd already heard before.`)
        setExplicitPercentage(`${(res.data.explicitPercentage.percentage / res.data.totalTracks) * 1000}% of your songs contained explicit material.`)
        setTopYear(`You listened to ${res.data.topYear.count} songs from ${res.data.topYear._id} this week, more than any other year.`)

      })
    } catch (err) {
      console.log(err);
    }
  }, [])

  return (
    <div id='weekly-stats'>
      {/* <h2>This week you listened to</h2> */}
      <h2>Your weekly stats</h2>
      <div id='weekly-stats-container' className="typing-text">
      <div className="typing-text__text">{topTrack}</div>
      <div>{topArtist}</div>
      <div>{uniqueArtists}</div>
      <div>{repeatedTracksPercentage}</div>
      <div>{explicitPercentage}</div>
      <div>{topYear}</div>
      </div>
    </div>
  );
}

export default HistoryAnalysis;
import { useEffect, useState } from 'react';
import Playlists from './Playlists';

function Sidebar() {
  const baseUrl = 'http://localhost:4000/';
  const [weeklyScore, setWeeklyScore] = useState('');

  useEffect(() => {
    fetch(baseUrl + 'getHistory', {
      method: 'GET',
    }).then(res => res.json())
      .then((data) => {
      setWeeklyScore(data)
    });
  }, [])

  const getHome = () => {
    console.log('You just pressed search');
    fetch(baseUrl + 'sidebar', {
      method: 'GET'
    }).then(response => response.json())
      .then(data => window.alert(data))
  }
  
  return (
    <div className='sidebar'>
      <div className='sidebar-nav'>
        <h1 id='logo'>Snobify</h1>
        <h1 id='this-week'>This week's score:</h1>
        <h1 id='score' style={{textDecoration: 'underline'}}>{weeklyScore}% Basic</h1>
        <p>Home</p>
        <p>Your Library</p>
      </div>
      <div id='sidebar-divider'></div>
      <Playlists />
    </div>
  );
}

export default Sidebar;

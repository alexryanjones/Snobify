import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Playlists from './Playlists';

function Sidebar() {
  const baseUrl = 'http://localhost:4000/';
  const [weeklyScore, setWeeklyScore] = useState(''); 
  const { token } = useSelector((state) => state.accessToken)
  
  useEffect(() => {
    if (token) {
      console.log('Sidebar accesstoken - ', token);
      axios({
        method: 'post',
        url: baseUrl + 'getHistory',
        data: {
          accessToken: token,
        },
      })
        .then((res) => {
          setWeeklyScore(res.data);
        });
    }
  }, [token])
  
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

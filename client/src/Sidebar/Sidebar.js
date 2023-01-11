import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Playlists from './Playlists';
import logoSVG from '../assets/Snobify-Logo.svg'

function Sidebar() {
  const baseUrl = 'http://localhost:4000/';
  const [weeklyScore, setWeeklyScore] = useState('');
  const { token } = useSelector((state) => state.accessToken);
  
  // Get recently played tracks
  useEffect(() => {
    if (token) {
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
        <div id='logo-container'>
        <img src={logoSVG} alt='snobify logo' id='logo' />
        <h1 id='snobify'>Snobify</h1>
        </div>
        <h3 id='this-week'>This week's score:</h3>
        <h3 id='score' style={{ textDecoration: 'underline' }}>
          {weeklyScore}% Basic
        </h3>
        <p className='sidebar-item'>Home</p>
        <p className='sidebar-item'>Your Library</p>
      </div>
      <div id='sidebar-divider'></div>
      <Playlists token={token} baseUrl={baseUrl} />
    </div>
  );
}

export default Sidebar;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Playlists from './Playlists';
import logo from '../assets/Snobify-Logo.svg'
import { setCurrentView } from '../Redux/currentView';


function Sidebar({weeklyScore}) {
  const baseUrl = 'http://localhost:4000/';
  const { token } = useSelector((state) => state.accessToken);
  const dispatch = useDispatch()

  
  useEffect(() => {
      axios({
        method: 'get',
        url: baseUrl + 'filter-date',
      });
  }, [])

  useEffect(() => {
      axios.get(baseUrl + 'load-insults');
  }, [])

  // // Get recently played tracks
  // useEffect(() => {
  //   try {
  //     if (token) {
  //       axios({
  //         method: 'post',
  //         url: baseUrl + 'get-history',
  //         data: {
  //           accessToken: token,
  //         },
  //       }).then((res) => {
  //         setWeeklyScore(res.data);
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [token])
  
  return (
    <div className='sidebar'>
      <div className='sidebar-nav'>
        <div id='logo-container'>
          <img id='logo' src={logo} alt='logo' />
          <h1 id='snobify'>Snobify</h1>
        </div>
        <h3 id='this-week'>This week's score:</h3>
        <h3 id='score' style={{ textDecoration: 'underline' }}>
          {weeklyScore}% Basic
        </h3>
        <p className='sidebar-item' onClick={() => dispatch(setCurrentView({playlistName: 'Home', playlistId: null}))}>Home</p>
        <p className='sidebar-item' onClick={() => dispatch(setCurrentView({playlistName: 'Your Library', playlistId: null}))}>Your Library</p>
      </div>
      <div id='sidebar-divider'></div>
      <Playlists token={token} baseUrl={baseUrl} />
    </div>
  );
}

export default Sidebar;

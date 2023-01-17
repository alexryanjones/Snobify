import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Playlists from './Playlists';
import logo from '../assets/Snobify-Logo.svg'
import { setCurrentView } from '../Redux/currentView';
import React from 'react';



function Sidebar({weeklyScore/* , playlists */}) {
  const baseUrl = 'http://localhost:4000/';
  const { token } = useSelector((state) => state.accessToken);
  const { user } = useSelector((state) => state.currentUser);
  const [playlists, setPlaylists] = useState([])
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

  useEffect(() => {
    try {
      if (token) {
        console.log(user);
        const getPlaylists = async () => {
          const response = await axios({
            method: 'post',
            url: baseUrl + 'my-playlists',
            data: {
              userId: user,
              accessToken: token,
            },
          });
          setPlaylists(response.data);
        };
        getPlaylists();
      }
    } catch (err) {
      window.alert('Could not get playlists: ', err);
    }
  }, [token]);
  
  return (
    <div className='sidebar'>
      <div className='sidebar-nav'>
        <div id='logo-container'>
          <img id='logo' src={logo} alt='logo' />
          <h1 id='snobify'>Snobify</h1>
        </div>
        <h3 id='this-week'>This week&apos;s score:</h3>
        <h3 id='score' style={{ textDecoration: 'underline' }}>
          {weeklyScore}% Basic
        </h3>
        <p
          className='sidebar-item'
          onClick={() =>
            dispatch(setCurrentView({ playlistName: 'Home', playlistId: null }))
          }
        >
          Home
        </p>
        <p
          className='sidebar-item'
          onClick={() =>
            dispatch(
              setCurrentView({ playlistName: 'Your Library', playlistId: null })
            )
          }
        >
          Your Library
        </p>
      </div>
      <div id='sidebar-divider'></div>
      <Playlists token={token} playlists={playlists} />
    </div>
  );
}

export default Sidebar;

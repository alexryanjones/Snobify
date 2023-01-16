import DashboardMain from './Dashboard/Main';
import Sidebar from './Sidebar/Sidebar';
import Login from './Login/Login';
import UseAuth from './Login/UseAuth';
import { useSelector, useDispatch } from 'react-redux';
// import MediaControls from './Player/MediaControls';
import WebPlayback from './Player/Webplayback';
import { useEffect, useState } from 'react';
import axios from 'axios';
import User from './User';
import HistoryAnalysis from './NowPlaying/HistoryAnalysis';
import CurrentlyPlaying from './NowPlaying/CurrentlyPlaying';
import { setCurrentUser } from './Redux/currentUser';
import React from 'react';



const code = new URLSearchParams(window.location.search).get('code');


function App() {
  const accessToken = UseAuth(code);
  const currentTrack = useSelector((state) => state.currentTrack);
  const [weeklyScore, setWeeklyScore] = useState(null);
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const dispatch = useDispatch();
  const baseUrl = 'http://localhost:4000/';

  // Get recently played tracks
  useEffect(() => {
    try {
      if (accessToken) {
        const getHistory = async () => {
          const response = await axios({
            method: 'post',
            url: baseUrl + 'get-history',
            data: {
              accessToken: accessToken,
            },
          })
          setWeeklyScore(response.data);
        }
        getHistory()
      }
    } catch (err) {
      console.log(err);
    }
  }, [accessToken]);

  // Get user info
  useEffect(() => {
    try {
      if (accessToken) {
        const getUser = async () => {
        const response = await axios({
            method: 'post',
            url: baseUrl + 'user',
            data: {
              accessToken: accessToken,
            },
          })
          setUser(response.data);
          dispatch(setCurrentUser(response.data));
        }
        getUser();
      }
    } catch (err) {
      window.alert('Could not get user: ', err)
    }
  }, [accessToken]);

  // Get playlists
  useEffect(() => {
    try {
      if (accessToken) {
        const getPlaylists = async () => {
        const response = await axios({
          method: 'post',
          url: baseUrl + 'my-playlists',
          data: {
            accessToken: accessToken,
          }
        })
        setPlaylists(response.data);
      }
      getPlaylists();
    } 
  } catch (err) {
      window.alert('Could not get playlists: ', err);
  }
  }, [accessToken]);

  return (
    <div>
      {accessToken ? (
        <div id='index'>
          <User user={user} />
          <Sidebar weeklyScore={weeklyScore} playlists={playlists} />
          <DashboardMain />
          {currentTrack?.title.length > 0 ? (
            <CurrentlyPlaying currentTrack={currentTrack} />
          ) : weeklyScore ? (
            <HistoryAnalysis />
          ) : null}
          <WebPlayback />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DashboardMain from './Dashboard/Main';
import Sidebar from './Sidebar/Sidebar';
import Login from './Login/Login';
import UseAuth from './Login/UseAuth';
import User from './User';
import WebPlayback from './Player/Webplayback';
import HistoryAnalysis from './NowPlaying/HistoryAnalysis';
import CurrentlyPlaying from './NowPlaying/CurrentlyPlaying';
import { setCurrentUser } from './Redux/currentUser';




const code = new URLSearchParams(window.location.search).get('code');

function App() {
  const accessToken = UseAuth(code);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [weeklyScore, setWeeklyScore] = useState(null);
  const currentTrack = useSelector((state) => state.currentTrack);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  // Get recently played tracks
  useEffect(() => {
    try {
      if (accessToken && currentUser) {
        const getHistory = async () => {
          const response = await axios({
            method: 'post',
            url: baseUrl + 'get-history',
            data: {
              accessToken: accessToken,
              currentUser: currentUser
            },
          })
          setWeeklyScore(response.data);
        }
        getHistory()
      }
    } catch (err) {
      console.log(err);
    }
  }, [accessToken, currentUser]);

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
          dispatch(setCurrentUser(response.data));
        }
        getUser();
      }
    } catch (err) {
      window.alert('Could not get user: ', err)
    }
  }, [accessToken]);

  return (
    <div>
      {accessToken ? (
        <div id='index'>
          <User />
          <Sidebar weeklyScore={weeklyScore} />
          <DashboardMain />
          {currentTrack?.title.length > 0 ? (
            <CurrentlyPlaying currentTrack={currentTrack} />
          ) : weeklyScore ? (
            <HistoryAnalysis />
          ) : <div style={{height: '90%', width: '30%', background: '#000000'}}/>}
          <WebPlayback />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

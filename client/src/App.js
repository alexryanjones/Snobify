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
        axios({
          method: 'post',
          url: baseUrl + 'get-history',
          data: {
            accessToken: accessToken,
          },
        }).then((res) => {
          setWeeklyScore(res.data);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [accessToken]);

  // Get user info
  useEffect(() => {
    if (accessToken) {
      axios({
        method: 'post',
        url: baseUrl + 'user',
        data: {
          accessToken: accessToken,
        },
      }).then((res) => {
        setUser(res.data);
        dispatch(setCurrentUser(res.data));
      });
    }
  }, [accessToken]);

  // Get playlists
  useEffect(() => {
    try {
      if (accessToken) {
        axios({
          method: 'post',
          url: baseUrl + 'my-playlists',
          data: {
            accessToken: accessToken,
          },
        }).then((res) => {
          setPlaylists(res.data);
        });
      }
    } catch (err) {
      console.log(err);
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
          {/* <MediaControls /> */}
          <WebPlayback />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

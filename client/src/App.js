import DashboardMain from './Dashboard/Main';
import Sidebar from './Sidebar/Sidebar';
import Login from './Login/Login';
import UseAuth from './Login/UseAuth';
import { useSelector, useDispatch } from 'react-redux';
import MediaControls from './Player/MediaControls';
import { useEffect, useState } from 'react';
import axios from 'axios';
import User from './User';
import HistoryAnalysis from './NowPlaying/HistoryAnalysis';
import CurrentlyPlaying from './NowPlaying/CurrentlyPlaying';


const code = new URLSearchParams(window.location.search).get('code');


function App() {
  const accessToken = UseAuth(code);
  const { currentPlayState } = useSelector((state) => state.currentPlayState);
  const [weeklyScore, setWeeklyScore] = useState('');
  const baseUrl = 'http://localhost:4000/';


  // const { queue } = useSelector((state) => state.queue);

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

  return (
    <div>
      {accessToken ? (
        <div id='index'>
          <User />
          <Sidebar weeklyScore = {weeklyScore}/>
          <DashboardMain />
          {currentPlayState ? <CurrentlyPlaying /> : <HistoryAnalysis />}
          {/* <MediaControls /> */}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

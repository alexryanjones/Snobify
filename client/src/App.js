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
import { setCurrentUser } from './Redux/currentUser';



const code = new URLSearchParams(window.location.search).get('code');


function App() {
  const accessToken = UseAuth(code);
  const { currentPlayState } = useSelector((state) => state.currentPlayState);
  const [weeklyScore, setWeeklyScore] = useState('');
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
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

  return (
    <div>
      {accessToken ? (
        <div id='index'>
          <User user={user} />
          <Sidebar weeklyScore={weeklyScore} />
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

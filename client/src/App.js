import DashboardMain from './Dashboard/Main';
import Sidebar from './Sidebar/Sidebar';
import Login from './Login/Login';
import UseAuth from './Login/UseAuth';
import { useSelector } from 'react-redux';
import MediaControls from './Player/MediaControls';
import User from './User';
import HistoryAnalysis from './NowPlaying/HistoryAnalysis';
import CurrentlyPlaying from './NowPlaying/CurrentlyPlaying';


const code = new URLSearchParams(window.location.search).get('code');


function App() {
  const accessToken = UseAuth(code);
  const { currentPlayState } = useSelector((state) => state.currentPlayState);
  // const { queue } = useSelector((state) => state.queue);


  return (
    <div>
      {accessToken ? (
        <div id='index'>
          <User />
          <Sidebar />
          <DashboardMain />
          {currentPlayState ? <CurrentlyPlaying /> : <HistoryAnalysis />}
          <MediaControls />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

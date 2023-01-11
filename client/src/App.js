import DashboardMain from './Dashboard/Main';
import Sidebar from './Sidebar/Sidebar';
import Login from './Login/Login';
import UseAuth from './Login/UseAuth';
import CurrentlyPlaying from './NowPlaying/CurrentlyPlaying';
import MediaControls from './Player/MediaControls';


const code = new URLSearchParams(window.location.search).get('code');


function App() {
  const accessToken = UseAuth(code);

  return (
    <div>
      {accessToken ? (
        <div id='index'>
          <Sidebar />
          <DashboardMain />
          <CurrentlyPlaying />
          <MediaControls />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

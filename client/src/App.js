import DashboardMain from './Dashboard/Main';
import Sidebar from './Sidebar/Sidebar';
import Login from './Login/Login';
import CurrentlyPlaying from './NowPlaying/CurrentlyPlaying';
import MediaControls from './Player/MediaControls';


const code = new URLSearchParams(window.location.search).get('code');

function App() {

  return (
    <div>
      {code ? (
        <div id='index'>
          <Sidebar />
          <DashboardMain code={code} />
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

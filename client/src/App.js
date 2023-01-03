import Homescreen from './Dashboard/Homescreen';
import Sidebar from './Sidebar/Sidebar';
import Login from './Login/Login';

const code = new URLSearchParams(window.location.search).get('code');

function App() {

  return (
    <div>
      {code ? (
        <div id='index'>
          <Sidebar />
          <Homescreen code={code} />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

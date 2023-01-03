import { useEffect } from 'react';
import Playlists from './Playlists';

function Sidebar() {
  const baseUrl = 'http://localhost:4000/';

  useEffect(() => {
    fetch(baseUrl + 'homescreen', {
      method: 'GET',
    }).then((data) => console.log(data));
  }, [])

  const getHome = () => {
    console.log('You just pressed search');
    fetch(baseUrl + 'sidebar', {
      method: 'GET'
    }).then(response => response.json())
      .then(data => window.alert(data))
  }
  
  return (
    <div className='sidebar'>
      <p id='logo'>Snobify</p>
      <p>Home</p>
      <button onClick={getHome}>Search</button>
      <p>Library</p>
      <p>Create playlist</p>
      <p>Liked songs</p>
      <p>Your episodes</p>
      <div id='sidebar-divider'></div>
      <Playlists />
    </div>
  );
}

export default Sidebar;

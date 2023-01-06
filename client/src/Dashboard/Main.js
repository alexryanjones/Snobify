import { Form } from 'react-bootstrap'
import { useState } from 'react';
import UseAuth from "../Login/UseAuth";


function DashboardMain ({code}) {
  const accessToken = UseAuth(code);
  const [search, setSearch] = useState('')

  return (
    <div className='dashboard'>
      <Form.Control
        id='search'
        type='search'
        placeholder='Search'
        value={search}
        onChange={e => setSearch(e.target.value)}
        ></Form.Control>
      <div id='list-container'>
        <h2 className='tile-title'>Good morning</h2>
        <div id='list-items'>
          <div className='playlist-tile'>
            <div className='playlist-artwork'>cover</div>
            <h3>Playlist name</h3>
            <h4>Artist</h4>
          </div>
          <div className='playlist-tile'>
            <div className='playlist-artwork'>cover</div>
            <h3>Playlist name</h3>
            <h4>Artist</h4>
          </div>
          <div className='playlist-tile'>
            <div className='playlist-artwork'>cover</div>
            <h3>Playlist name</h3>
            <h4>Artist</h4>
          </div>
          <div className='playlist-tile'>
            <div className='playlist-artwork'>cover</div>
            <h3>Playlist name</h3>
            <h4>Artist</h4>
          </div>
          <div className='playlist-tile'>
            <div className='playlist-artwork'>cover</div>
            <h3>Playlist name</h3>
            <h4>Artist</h4>
          </div>
          <div className='playlist-tile'>
            <div className='playlist-artwork'>cover</div>
            <h3>Playlist name</h3>
            <h4>Artist</h4>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DashboardMain;
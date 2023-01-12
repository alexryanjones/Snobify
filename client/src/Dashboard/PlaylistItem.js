function PlaylistItem ({track}) {
  return (
    <div className='track-container'>
      <img id='playlist-item-artwork' src={track.artwork} alt='album artwork'/>
      <div classNam="playlist-item-track-info">
        <div>{track.title}</div>
        <div>{track.artist}</div>
      </div>
      <div>{track.album}</div>
      <div>{track.duration}</div>
    </div>
  );
}

export default PlaylistItem;
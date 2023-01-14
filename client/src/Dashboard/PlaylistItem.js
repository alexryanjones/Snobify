function PlaylistItem ({track}) {
  
  // Format track duration
  const millisecondsToMinutes =
    Math.floor(track.duration / 60000) +
    ':' +
    (((track.duration % 60000) / 1000).toFixed(0) < 10 ? '0' : '') +
    ((track.duration % 60000) / 1000).toFixed(0);

  return (
    <div className='track-container'>
      <div className='track-id'>{track.id}</div>
      <img id='playlist-item-artwork' src={track.artwork} alt='album artwork' />
      <div className='playlist-item-track-info'>
        <div className='playlist-item-track-title'>{track.title}</div>
        <div>{track.artist}</div>
      </div>
      <div>{track.album}</div>
      <div>{millisecondsToMinutes}</div>
    </div>
    
  );
}

export default PlaylistItem;
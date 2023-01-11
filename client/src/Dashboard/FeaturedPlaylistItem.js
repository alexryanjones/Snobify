function FeaturedPlaylistItem ({ playlist}) {
  console.log(playlist.playlistArtwork);

  return (
    <div className='playlist-tile'>
      <img
        className='playlist-artwork'
        src={playlist.playlistArtwork}
        alt='playlist-cover'
      />
      <div className='playlist-title'>{playlist.name}</div>
      <div className='playlist-description'>{playlist.description}</div>
    </div>
  );
}
export default FeaturedPlaylistItem
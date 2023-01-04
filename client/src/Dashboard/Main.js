import UseAuth from "../Login/UseAuth";


function DashboardMain ({code}) {
  const accessToken = UseAuth(code);

  return (
    <div className='dashboard'>
      <div id='search'></div>
      <div id='list-items'>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
        <p className='list-cover'>List</p>
      </div>
    </div>
  );
}

export default DashboardMain;
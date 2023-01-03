import UseAuth from "../Login/UseAuth";


function Homescreen ({code}) {
const accessToken = UseAuth(code);

  return (
    <div className='homescreen'>
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
  );
}

export default Homescreen;
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dropdown from './assets/dropdown.svg'

function User() {
  const baseUrl = 'http://localhost:4000/';
  const [user, setUser] = useState(null)
  const { token } = useSelector((state) => state.accessToken);

  useEffect(() => {
    if (token) {
      axios({
        method: 'post',
        url: baseUrl + 'user',
        data: {
          accessToken: token,
        },
      }).then((res) => {
        setUser(res.data)
      });
    }
  }, [token]);

  return (
    <div>
      {user ? (
        <div id='user-container'>
          <img id='display-picture' src={user.image} alt='display' />
          <div id='display-name'>{user.name}</div>
          <img id='dropdown' src={dropdown} alt='dropdown' />
        </div>
      ) : null}
    </div>
  );
}
export default User;
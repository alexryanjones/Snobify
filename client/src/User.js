import dropdown from './assets/dropdown.svg'
import React from 'react';
import { useSelector } from 'react-redux';

function User() {
  const { user } = useSelector((state) => state.currentUser);

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

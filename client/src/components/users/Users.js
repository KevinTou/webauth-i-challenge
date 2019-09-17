import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = props => {
  const [users, setUsers] = useState();

  useEffect(() => {
    if (!users) {
      axios
        .get('http://localhost:8000/api/users', {
          headers: {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password'),
          },
          withCredentials: true,
        })
        .then(res => {
          setUsers(res.data);
        });
    }
  }, [users]);

  return (
    <div style={{ padding: '6rem' }}>
      <h1>Users</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {users &&
          users.map(user => {
            return (
              <div key={user.id} style={{ width: '200px' }}>
                <p>ID: {user.id}</p>
                <p>{user.username}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Users;

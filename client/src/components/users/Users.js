import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = props => {
  const [users, setUsers] = useState();

  useEffect(() => {
    if (!users) {
      axios
        .get('http://localhost:8000/api/users', {
          headers: {
            username: 'Kevin',
            password: 'Tou',
          },
        })
        .then(res => {
          setUsers(res.data);
        });
    }
  }, [users]);

  return (
    <div style={{ padding: '6rem' }}>
      <h1>Users</h1>
      {users &&
        users.map(user => {
          return (
            <div key={user.id}>
              <p>ID: {user.id}</p>
              <p>{user.username}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Users;

const db = require('../../data/db-config.js');

module.exports = {
  getUsers,
  getUsersBy,
  getUsersById,
  addUser,
};

function getUsers() {
  return db('users').select('id', 'username', 'password');
}

function getUsersBy(filter) {
  return db('users').where(filter);
}

function getUsersById(id) {
  return db('users')
    .where('id', id)
    .first();
}

function addUser(user) {
  return db('users')
    .insert(user, 'id')
    .then(([newId]) => {
      return getUsersById(newId);
    });
}

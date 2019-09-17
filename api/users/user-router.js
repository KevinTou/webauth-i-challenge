const express = require('express');

const Users = require('./user-model.js');
const restricted = require('../auth/restricted-middleware.js');

const router = express.Router();

router.get('/', restricted, (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;

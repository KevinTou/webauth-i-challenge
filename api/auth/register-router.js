const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model.js');

const router = express.Router();

router.post('/', (req, res) => {
  let { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 14);

  Users.addUser({ username, password: hash })
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;

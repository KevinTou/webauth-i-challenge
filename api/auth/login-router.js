const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model.js');

const router = express.Router();

router.post('/', (req, res) => {
  let { username, password } = req.body;

  Users.getUsersBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `Logged in.` });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;

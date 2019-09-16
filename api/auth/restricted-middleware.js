const bcrypt = require('bcryptjs');

const Users = require('../users/user-model.js');

module.exports = (req, res, next) => {
  let { username, password } = req.headers;

  Users.getUsersBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        return res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(error => {
      return res.status(500).json(error);
    });
};

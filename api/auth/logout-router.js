const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(500).json({
          message:
            'you can check out anytime you like, but you can never leave',
        });
      } else {
        res.status(200).json({ message: 'Logging out.' });
      }
    });
  } else {
    res.status(200).json({ message: 'Already logged out.' });
  }
});

module.exports = router;

const fs = require('fs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('../config');

const USER_NOT_EXISTS = 'user not exists!';

const signin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send('BAD request! username or password is missing!');
  }

  let userRequested = {
    username: username,
    password: password
  };

  let loadingUsersData = new Promise((resolve, reject) => {
    fs.readFile('userInfo.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });

  loadingUsersData
    .then(data => JSON.parse(data))
    .then(users => {
      let user = _.find(users, { username: username });
      if (user && username === user.username && password === user.password) {
        let token = jwt.sign({ username: username }, config.secret, {
          expiresIn: config.expireTime
        });

        res.status(200).json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      }
      return users;
    });
};

module.exports = signin;

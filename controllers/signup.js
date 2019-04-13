const fs = require('fs');
const _ = require('lodash');
const { encrypt } = require('../modules/cryptoPassword');

const USER_ALREADY_EXISTS = 'user already exists!';

const signup = (req, res) => {
  const username = req.body.username;
  const password = encrypt(req.body.password);

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
      if (user) {
        throw new Error(USER_ALREADY_EXISTS);
      }
      return users;
    })
    .then(users => {
      users.push(userRequested);
      fs.writeFile('userInfo.json', JSON.stringify(users), err => {
        if (err) {
          throw err;
        }

        res.status(201).send('user added!');
      });
    })
    .catch(err => {
      if (err.message === USER_ALREADY_EXISTS) {
        res.status(400).send(USER_ALREADY_EXISTS);
      } else {
        res.status(500).send(err.message);
      }
    });
};

module.exports = signup;

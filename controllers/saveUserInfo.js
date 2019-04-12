const fs = require('fs');

const saveUserInfo = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send('BAD request! username or password is missing!');
  }

  let obj = {
    username: username,
    password: password
  };

  fs.writeFile('./userInfo.json', JSON.stringify(obj), err => {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(201).send('file has been saved.');
  });
};

module.exports = saveUserInfo;

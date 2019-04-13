import { encrypt, getUser, saveUser } from '../modules';
import {
  USER_ALREADY_EXISTS,
  USERNAME_OR_PASSWORD_MISSING
} from '../errorMessages';

const signup = async (req, res) => {
  const username = req.body.username;
  const password = encrypt(req.body.password);

  if (!username || !password) {
    throw new Error(USERNAME_OR_PASSWORD_MISSING);
  }

  let userRequested = {
    username: username,
    password: password
  };

  try {
    let user = await getUser(username);
    if (user) {
      throw new Error(USER_ALREADY_EXISTS);
    }

    await saveUser(userRequested);
    res.status(201).send('user added!');
  } catch (err) {
    if (err.message === USER_ALREADY_EXISTS) {
      res.status(400).send(USER_ALREADY_EXISTS);
    } else if (err.message === USERNAME_OR_PASSWORD_MISSING) {
      res.status(400).send(USERNAME_OR_PASSWORD_MISSING);
    } else {
      res.status(500).send(err.message);
    }
  }
};

export default signup;

import fs from 'fs';
import { promisify } from 'util';
import _ from 'lodash';

const readFile = promisify(fs.readFile);

const getUser = async username => {
  const content = await readFile('userInfo.json', 'utf8');
  const users = JSON.parse(content);
  let user = _.find(users, { username: username });

  return user;
};

export default getUser;

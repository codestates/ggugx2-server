import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const saveUser = async user => {
  const content = await readFile('userInfo.json', 'utf8');
  let users = JSON.parse(content);

  users.push(user);
  await writeFile('userInfo.json', JSON.stringify(users));
};

export default saveUser;

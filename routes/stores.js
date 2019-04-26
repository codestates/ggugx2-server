import express from 'express';
import {
  signinStores,
  signupStores,
  getStoreInfo,
  menuList
  // uploadImage
} from '../controllers';

const app = express.Router();

app.post('/stores/signup', (req, res) => {
  console.log('Now you are at signup!!! body: ', req.body);
  signupStores(req, res);
});

app.post('/stores/signin', (req, res) => {
  console.log('Now you are at signin!!! body: ', req.body);
  signinStores(req, res);
});

//REST API 왠만한 API들은 같은 category 단위로 묶기
app.post('/stores/get-store-info', (req, res) => {
  console.log('Now you are at getStoreInfo page!!! body: ', req.body);
  getStoreInfo(req, res);
});

app.post('/stores/menu-list', (req, res) => {
  console.log('Now you are at menuList page!!! body: ', req.body);
  menuList(req, res);
});

// app.post('/stores/upload-image', upload.single('image'), (req, res, next) => {
//   console.log(('Now you are at upload-image page!!! body: ', req.body);
//   uploadImage(req, res);
// });

export default app;

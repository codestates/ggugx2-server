import express from 'express';
import {
  signinStores,
  signupStores,
  getStoreInfo,
  menuList,
  searchByMenu,
  getNearestStores,
  addMenu,
  storeInfoUpdate,
  uploadImage
} from '../controllers';
import { checkToken } from '../middlewares';

const app = express.Router();

app.post('/stores/nearby', checkToken, (req, res) => {
  console.log('reached at /stores/nearby');
  getNearestStores(req, res);
});

app.post('/stores/signup', (req, res) => {
  console.log('Now you are at signup!!! body: ', req.body);
  signupStores(req, res);
});

app.post('/stores/signin', (req, res) => {
  console.log('Now you are at signin!!! body: ', req.body);
  signinStores(req, res);
});

app.post('/stores/get-store-info', checkToken, (req, res) => {
  console.log('Now you are at getStoreInfo page!!! body: ', req.body);
  getStoreInfo(req, res);
});

app.post('/stores/menu-list', checkToken, (req, res) => {
  console.log('Now you are at menuList page!!! body: ', req.body);
  menuList(req, res);
});

app.post('/stores/search', checkToken, (req, res) => {
  console.log('reached at /stores/search');
  searchByMenu(req, res);
});

app.post('/stores/menu', checkToken, (req, res) => {
  console.log('reached at /stores/menu');
  addMenu(req, res);
});

app.post('/stores/update', checkToken, (req, res) => {
  console.log('reached at /stores/update');
  storeInfoUpdate(req, res);
});

app.post('/stores/upload-image', checkToken, (req, res) => {
  console.log('Now you are at uploadImage-image page!!! body: ', req.body);
  uploadImage(req, res);
});

export default app;

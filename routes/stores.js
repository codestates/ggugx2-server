import express from 'express';
import { signinStore, signupStores } from '../controllers';

const app = express.Router();

app.post('/stores/signupStores', (req, res) => {
    console.log('reached at signup!!! body: ', req.body);
    signupStores(req, res);
});

export default app;

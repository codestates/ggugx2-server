import express from 'express';
import bodyParser from 'body-parser';
import {
  stores,
  customers,
  tests,
  getStampsRewardsCounts,
  stamps
} from './routes';
import { socketioHandler } from './controllers';
import cors from 'cors';
import socketIO from 'socket.io';
import http from 'http';
import { checkToken } from './middlewares';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import { secret } from './config';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

//-----------------------------------------------------
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
const s3 = new aws.S3({
  accessKeyId: 'AKIAJKGQKLF4L7YPH47A',
  secretAccessKey: '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',
  Bucket: 'gguck2-deploy'
});
//-----------------------------------------------------

io.on('connection', socketioHandler);

app.get('/', (req, res) => {
  console.log('request reached at /');
  res.status(200).send('SUCCESS!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//-----------------------------------------------------

aws.config.region = 'ap-northeast-1'; //Seoul
// aws.config.update({
//   accessKeyId: 'AKIAJKGQKLF4L7YPH47A',
//   secretAccessKey: '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',
//   Bucket: 'gguck2-deploy'
// });
// console.log(aws.config);
console.log('왜안떠?');
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'gguck2-deploy',
    key: function(req, file, cb) {
      console.log('keyRequest ', req);
      console.log('file!!! ? : ', file);
      cb(null, Date.now().toString());
    }
  })
});

app.post('/upload', upload.single('image'), function(req, res, next) {
  console.log(req.file);
  res.send(req.file);
});
// const uploadImage = async (req, res) => {
//   console.log('!!!!!!!!! req: ', req);
//   const storeId = req.body.storeId;

//   try {
//     multer({
//       storage: multerS3({
//         s3: s3,
//         bucket: 'gguck2',
//         key: function(req, file, cb) {
//           cb(null, Date.now().toString());
//         }
//       })
//     });
//     res.send('Successfully uploaded ' + req.files.length + ' files!');
//   } catch (err) {
//     throw new Error('something is wrong');
//   }
// };
//-----------------------------------------------------

app.use(customers);
app.use(tests);
app.use(stores);
app.use(getStampsRewardsCounts);
app.use(stamps);

app.set('port', port);

module.exports = app;
server.listen(app.get('port'), () => {
  console.log('now listening on port ', app.get('port'));
});

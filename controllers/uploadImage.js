import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import db from '../models';
import { accessKey, secretAccessKey } from '../config';

const s3 = new aws.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretAccessKey,
  Bucket: 'gguck2-deploy'
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'gguck2-deploy',
    key: function(req, res, cb) {
      cb(null, `image/${Date.now().toString()}`);
    }
  })
});

const singleUpload = upload.single('filepond');
const uploadImage = (req, res) => {
  singleUpload(req, res, err => {
    if (req === undefined || req === null) {
      res.end(err.message);
    } else if (req) {
      db.storeImage.create({
        isMain: req.body.isMain,
        storeId: req.body.storeId,
        url: req.file.location
      });
      res.status(200).json({
        url: req.file.location
      });
    } else {
      res.status(500).send('Internal problem');
    }
  });
};

export default uploadImage;

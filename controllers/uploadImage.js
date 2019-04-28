import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import db from '../models';

const s3 = new aws.S3({
  accessKeyId: 'AKIAJKGQKLF4L7YPH47A',
  secretAccessKey: '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',
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

const singleUpload = upload.single('image');
const uploadImage = (req, res) => {
  singleUpload(req, res, err => {
    if (req === undefined || req === null) {
      res.end(err.message);
    } else if (req) {
      db.storeImage.create({
        isMain: req.body.isMain,
        storeID: req.body.storeId,
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

import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

const s3 = new aws.S3({
  accessKeyId: 'AKIAJKGQKLF4L7YPH47A',
  secretAccessKey: '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',
  Bucket: 'gguck2-deploy'
});

const upload = multer({
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

const uploadImage = (req,
res,
(err, some) => {
  if (err) {
    return res
      .status(422)
      .send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
  }
  return res.json({ imageUrl: req.file.location });
});

export default uploadImage;

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
    key: function(req, file, cb) {
      // console.log('keyRequest ', req);
      // console.log('file!!! ? : ', file);
      cb(null, Date.now().toString());
    }
  })
});

const singleUpload = upload.single('image');

const uploadImage = (req, res) => {
  singleUpload(req, res, (err, some) => {
    if (err) {
      return res.status(422).send({
        errors: [{ title: 'Image Upload Error', detail: err.message }]
      });
    }
    return res.json({ imageUrl: req.file.location });
  });
  console.log('!!!!!!!!!!!!!!!!!!!', uploadImage);
};

// const { isMain, storeId } = req.body;
// try {
//   let storeimage = await db.storeimage
//     .findAll({
//       where: {
//         [Op.and]: [{ isMain: isMain }, { storeID: storeId }, { url: null }]
//       }
//     })
//     .map(itme => itme.dataValues);

//   if (storeimage) {
//     await db.storeImage.update({
//       url: req.file.location
//     });
//     res.status(200).send('url has udated!!!!!!!');
//   } else {
//     res.status(200).json({
//       url: req.file.location
//     });
//   }
// } catch (err) {
//   throw new Error(err.message);
// }
// };

export default uploadImage;

// import db from '../models';
// import aws from 'aws-sdk';
// import multer from 'multer';
// import multerS3 from 'multer-s3';

// aws.config.update({
//   secretAccessKey: 'key',
//   accessKeyId: 'key',
//   region: 'northeast-1'
// });

// //TODO: maybe need to change const to = let
// let s3 = new aws.S3();

// const uploadImage = async (req, res) => {
//   const { storeID, isMain } = req.body;

//   try {
//     let storeimage = await db.storeimage.findOne({
//       where: { isMain: isMain }
//     });
//     if (storeimage) {
//       throw new Error('Stop baby!');
//     }

//     const ImageUpdate = multer({
//       storage: multerS3({
//         s3: s3,
//         bucket: 'gguck2-deploy',
//         key: (req, file, cb) => {
//           console.log(file);
//           let extension = path.extname(file.originalname);
//           cb(null, Date.now().toString() + extension); //Date.now()로 파일을 특별 파일명 만들기
//         },
//         acl: 'public-read-write'
//       })
//     });
//     res.status(201).send('image has added!!!!');
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };
// export default uploadImage;

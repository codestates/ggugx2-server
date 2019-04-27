// import db from '../models';
// import multer from 'multer';
// import multerS3 from 'multer-s3';
// import aws from 'aws-sdk';
// aws.config.update({
//   secretAccessKey: 'key',
//   accessKeyId: 'key',
//   region: 'northeast-1'
// });

//TODO: maybe need to change const to = let

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
// export default uploadImage;

// const uploadImage = async (req, res) => {
//   const { storeID } = req.body;

//   try {
//     let storeimage = await db.storeimage.findOne({
//       where: { storeID: storeID }
//     });
//     if (storeimage && storeimage.url === null) {
//       const ImageUpdate = multer({
//         storage: multerS3({
//           s3: s3,
//           bucket: 'gguck2-deploy',
//           key: (req, file, cb) => {
//             console.log(file);
//             cb(null, Date.now().toString() + file.originalname); //Date.now()로 파일을 특별 파일명 만들기
//           },
//           acl: 'public-read-write'
//         })
//       });
//       res.status(201).send('image has added!!!!');

//       console.log('image locate in url : ', req.file.location);

//       await storeimage.update({
//         url: req.file.location
//       });
//       res.status(201).send('url is now add to db!!!!');
//     }
//   } catch (err) {
//     throw new Error('something is going wrong!!!');
//   }
// };

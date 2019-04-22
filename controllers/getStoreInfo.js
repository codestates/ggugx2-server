// import db from '../models';

// const Op = db.sequelize.Op;

// const getStoreInfo = asny(req, res) => {
//   const storeID = req.body.storeID;

//   try {
//     let StoreMenuInfo = await db.menus.findAll({
//       where: {
//         [Op.and]: [{
//           STORE_ID: storeID,
//           NAME: name,
//           PRICE: price
//         }]
//       }
//     })

//     res.status(200).json({
//       storeInfo: {
//         STORE_ID: storeID,
//         Name: name,
//         PRIC: price
//       }
//     }).catch(err){
//       res
//     }
//   }
// }

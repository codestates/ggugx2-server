import db from '../models';
const Op = db.Sequelize.Op;
const storeSockets = {};
const customerSockets = {};

const stamp = function(socket) {
  console.log('a socket connected!');
  socket.on('register', msg => {
    if (msg.type === 'store') {
      storeSockets[msg.id] = socket;
      socket.id = msg.id;
      console.log(`store ${socket.id} has been registered!`);
    } else if (msg.type === 'customer') {
      customerSockets[msg.id] = socket;
      socket.id = msg.id;
      console.log(`customer ${socket.id} has been registered!`);
    }
  });

  socket.on('stamp add from user', msg => {
    console.log(`[stamp add] ${socket.id} send a request to ${msg.store}`);
    storeSockets[msg.store].emit('stamp confirm to store', {
      customer: socket.id
    });
  });

  socket.on('stamp confirm from store', async msg => {
    console.log(
      `[stamp confirm] ${socket.id} confirm stamp add for ${msg.customer}`
    );
    try {
      db.stamp.create({
        customerId: msg.customer,
        storeId: socket.id
      });

      customerSockets[msg.customer].emit('stamp add complete', msg);
      socket.emit('stamp add complete', msg);
    } catch (err) {
      socket.emit('errors', { message: err.message });
    }
  });

  // Reward

  socket.on('reward use from user', async msg => {
    const customerID = socket.id;
    const storeID = msg.store;

    console.log(`[reward use] ${customerID} send a request to ${storeID}`);
    try {
      let menusData = await db.menu
        .findAll({
          where: { storeId: storeID }
        })
        .map(item => item.dataValues);

      let rewardsData = await db.reward
        .findAll({
          where: {
            [Op.and]: [
              { menuId: menusData[0].id },
              { customerId: customerID },
              { usedDate: null }
            ]
          }
        })
        .map(item => item.dataValues);

      if (rewardsData.length === 0) {
        socket.emit('errors', {
          message: "You don't have any rewards available."
        });
      } else {
        storeSockets[storeID].emit('reward confirm to store', {
          customer: customerID
        });
      }
    } catch (err) {
      console.log('error occured!!!, ', err.message);
      socket.emit('errors', { message: err.message });
    }
  });

  socket.on('reward confirm from store', async msg => {
    const customerID = msg.customer;
    const storeID = socket.id;

    console.log(
      `[reward confirm] ${storeID} confirm reward use for ${customerID}`
    );
    try {
      let menusData = await db.menu
        .findAll({
          where: { storeId: storeID }
        })
        .map(item => item.dataValues);

      await db.reward.update(
        { usedDate: db.Sequelize.fn('NOW') },
        {
          order: ['createdAt', 'DESC'],
          limit: 1,
          where: {
            [Op.and]: [
              { menuId: menusData[0].id },
              { customerId: customerID },
              { usedDate: null }
            ]
          }
        }
      );

      let stampsData = await db.stamp
        .findAll({
          where: {
            [Op.and]: [
              { customerId: customerID },
              { storeId: storeID },
              { exchangedDate: null }
            ]
          }
        })
        .map(item => item.dataValues);

      let rewardsData = await db.reward
        .findAll({
          where: {
            [Op.and]: [
              { menuId: menusData[0].id },
              { customerId: customerID },
              { usedDate: null }
            ]
          }
        })
        .map(item => item.dataValues);

      let resultObj = {
        store: storeID,
        customer: customerID,
        stamps: stampsData.length,
        rewards: rewardsData.length
      };

      customerSockets[msg.customer].emit('reward use complete', resultObj);
      socket.emit('reward use complete', resultObj);
    } catch (err) {
      socket.emit('errors', { message: err.message });
    }
  });
};

export default stamp;

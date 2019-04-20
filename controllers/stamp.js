import db from '../models';
const storeSockets = {};
const customerSockets = {};

const stamp = function(socket) {
  console.log('a socket connected!');
  try {
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

      db.stamps.create({
        CUSTOMER_ID: msg.customer,
        STORE_ID: socket.id
      });

      customerSockets[msg.customer].emit('stamp add complete', msg);
      socket.emit('stamp add complete', msg);
    });

    // Reward

    socket.on('reward use from user', msg => {
      console.log(`[reward use] ${socket.id} send a request to ${msg.store}`);
      storeSockets[msg.store].emit('reward confirm to store', {
        customer: socket.id
      });
    });

    socket.on('reward confirm from store', async msg => {
      console.log(
        `[reward confirm] ${socket.id} confirm reward use for ${msg.customer}`
      );

      await db.stamps.update(
        { USED_DATE: db.Sequelize.fn('NOW') },
        {
          order: ['createdAt', 'DESC'],
          limit: 1,
          where: {
            [Op.and]: [{ CUSTOMER_ID: customerID }, { USED_DATE: null }]
          }
        }
      );

      let stampsData = await db.stamps
        .findAll({
          where: {
            [Op.and]: [
              { CUSTOMER_ID: customerID },
              { STORE_ID: storeID },
              { EXCHANGED_DATE: null }
            ]
          }
        })
        .map(item => item.dataValues);

      let rewardsData = await db.rewards
        .findAll({
          where: {
            [Op.and]: [{ CUSTOMER_ID: customerID }, { USED_DATE: null }]
          }
        })
        .map(item => item.dataValues);

      let resultObj = {
        stamps: stampsData.length,
        rewards: rewardsData.length
      };

      customerSockets[msg.customer].emit('reward use complete', resultObj);
      socket.emit('reward use complete', resultObj);
    });
  } catch (err) {
    socket.on('errors', {
      message: err.message
    });
  }
};

export default stamp;

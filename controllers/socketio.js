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
    let customerId = msg.customer;
    let storeId = socket.id;
    const NO_SUCH_CUSTOMER_OR_STORE = 'no such customer or store!';

    console.log(
      `[stamp confirm] ${socket.id} confirm stamp add for ${msg.customer}`
    );
    try {
      console.log('now finding requested customer and store...');
      let customer = await db.customer.findByPk(customerId);
      let store = await db.store.findByPk(storeId);

      if (!customer || !store) {
        console.log('ERROR no such customer or store!');
        throw new Error('no such customer or store!');
      }

      console.log('found the two without error!');
      console.log('now creating new stamp...');

      let newStamp = await db.stamp.create({});
      newStamp.setCustomer(customer);
      newStamp.setStore(store);

      console.log('stamp created with no error!');
      console.log('now sending success message!');

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
    const customerId = msg.customer;
    const storeId = socket.id;

    console.log(
      `[reward confirm] ${storeId} confirm reward use for ${customerId}`
    );
    try {
      console.log('now finding menus of the store...');

      let menuData = await db.menu
        .findAll({
          attributes: ['id'],
          where: { storeId: storeId }
        })
        .map(item => item.dataValues);
      console.log('menu found: ', menuData);
      let rewardMenu = menuData[0];

      console.log('now updating reward to uesd one...');
      let updatedReward = await db.reward.update(
        { usedDate: db.Sequelize.fn('NOW') },
        {
          order: ['createdAt', 'DESC'],
          limit: 1,
          where: {
            [Op.and]: [
              { menuId: rewardMenu.id },
              { customerId: customerId },
              { usedDate: null }
            ]
          }
        }
      );
      console.log('update completed!: ', updatedReward);

      console.log('now counting remained stamps...');
      let numOfStampsRemained = await db.stamp
        .findAll({
          where: {
            [Op.and]: [
              { customerId: customerId },
              { storeId: storeId },
              { exchangedDate: null }
            ]
          }
        })
        .count();

      let numOfRewardsRemained = await db.reward
        .findAll({
          where: {
            [Op.and]: [
              { menuId: rewardMenu.id },
              { customerId: customerId },
              { usedDate: null }
            ]
          }
        })
        .count();

      let resultObj = {
        store: storeId,
        customer: customerId,
        stamps: numOfStampsRemained,
        rewards: numOfRewardsRemained
      };

      customerSockets[msg.customer].emit('reward use complete', resultObj);
      socket.emit('reward use complete', resultObj);
    } catch (err) {
      socket.emit('errors', { message: err.message });
    }
  });
};

export default stamp;

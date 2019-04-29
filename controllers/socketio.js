import db from '../models';
import { NO_SUCH_CUSTOMER_OR_STORE } from '../errorMessages';
const Op = db.Sequelize.Op;
const storeSockets = {};
const customerSockets = {};

const socketioHandler = function(socket) {
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

  socket.on('stamp add from user', async msg => {
    const customerId = socket.id;
    const storeId = msg.store;
    console.log(`[stamp add] ${customerId} send a request to ${storeId}`);
    let { dataValues: customer } = await db.customer.findByPk(customerId);
    storeSockets[msg.store].emit('stamp confirm to store', {
      customer: socket.id,
      customerName: customer.name
    });
  });

  socket.on('stamp confirm from store', async msg => {
    let customerId = msg.customer;
    let storeId = socket.id;

    console.log(
      `[stamp confirm] ${socket.id} confirm stamp add for ${msg.customer}`
    );
    try {
      console.log('now finding requested customer and store...');
      let customer = await db.customer.findByPk(customerId);
      let store = await db.store.findByPk(storeId);

      if (!customer || !store) {
        console.log(`ERROR ${NO_SUCH_CUSTOMER_OR_STORE}`);
        throw new Error(NO_SUCH_CUSTOMER_OR_STORE);
      }

      console.log('found the two without error!');
      console.log('now creating new stamp...');

      let newStamp = await db.stamp.create({});
      newStamp.setCustomer(customer);
      newStamp.setStore(store);

      console.log('stamp created with no error!');
      console.log('now sending success message!');

      let sucessMessage = {
        customer: customerId,
        customerName: customer.dataValues.name,
        store: storeId,
        storeName: store.dataValues.name
      };

      customerSockets[msg.customer].emit('stamp add complete', sucessMessage);
      socket.emit('stamp add complete', sucessMessage);
    } catch (err) {
      socket.emit('errors', { message: err.message });
    }
  });

  // Reward

  socket.on('reward use from user', async msg => {
    const customerId = socket.id;
    const storeId = msg.store;

    console.log(`[reward use] ${customerId} send a request to ${storeId}`);
    try {
      let customerData = await db.customer.findByPk(customerId);
      let storeData = await db.store.findByPk(storeId);

      if (!customerData || !storeData) {
        console.log(NO_SUCH_CUSTOMER_OR_STORE);
        throw new Error(NO_SUCH_CUSTOMER_OR_STORE);
      }
      let customer = customerData.dataValues;

      let menusData = await db.menu
        .findAll({
          where: { storeId }
        })
        .map(item => item.dataValues);

      let rewardsData = await db.reward
        .findAll({
          where: {
            [Op.and]: [
              { menuId: menusData[0].id },
              { customerId },
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
        storeSockets[storeId].emit('reward confirm to store', {
          customer: customerId,
          customerName: customer.name
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
      let customerData = await db.customer.findByPk(customerId);
      let storeData = await db.store.findByPk(storeId);

      if (!customerData || !storeData) {
        console.log(NO_SUCH_CUSTOMER_OR_STORE);
        throw new Error(NO_SUCH_CUSTOMER_OR_STORE);
      }
      let customer = customerData.dataValues;
      let store = storeData.dataValues;

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
      await db.reward.update(
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
      console.log('update completed!');

      console.log('now counting remained stamps...');
      let stampsData = await db.stamp.findAll({
        where: {
          [Op.and]: [
            { customerId: customerId },
            { storeId: storeId },
            { exchangedDate: null }
          ]
        }
      });

      let rewardsData = await db.reward.findAll({
        where: {
          [Op.and]: [{ customerId: customerId }, { usedDate: null }]
        },
        include: [
          {
            model: db.menu,
            attributes: ['id'],
            required: true,
            where: {
              storeId: storeId
            }
          }
        ]
      });

      let resultObj = {
        store: storeId,
        storeName: store.name,
        customer: customerId,
        customerName: customer.name,
        stamps: stampsData.length,
        rewards: rewardsData.length
      };
      console.log('result: ', resultObj);
      customerSockets[msg.customer].emit('reward use complete', resultObj);
      socket.emit('reward use complete', resultObj);
    } catch (err) {
      socket.emit('errors', { message: err.message });
    }
  });
};

export default socketioHandler;

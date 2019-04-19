import db from '../models';
const registeredSockets = {};

const stamp = function(socket) {
  console.log('a socket connected!');
  try {
    socket.on('register', msg => {
      registeredSockets[msg.id] = socket;
      socket.id = msg.id;
      console.log(`${socket.id} has been registered!`);
    });

    socket.on('stamp add from user', msg => {
      console.log(`[stamp add] ${socket.id} send a request to ${msg.store}`);
      registeredSockets[msg.store].emit('stamp confirm to store', {
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

      registeredSockets[msg.customer].emit('stamp add complete', msg);
      socket.emit('stamp add complete', msg);
    });
  } catch (err) {
    socket.on('errors', {
      message: err.message
    });
  }
};

export default stamp;

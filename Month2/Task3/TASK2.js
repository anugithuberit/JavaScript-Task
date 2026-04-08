// Import EventEmitter
const EventEmitter = require('events');

// Create instance
const eventEmitter = new EventEmitter();

// Create counter
let orderCount = 0;

// Create event listener
eventEmitter.on('orderPlaced', () => {
    orderCount++; // increase counter

    console.log("Order placed successfully");
    console.log("Total Orders:", orderCount);
    console.log("----------------------");
});

// Trigger event 5 times
eventEmitter.emit('orderPlaced');
eventEmitter.emit('orderPlaced');
eventEmitter.emit('orderPlaced');
eventEmitter.emit('orderPlaced');
eventEmitter.emit('orderPlaced');
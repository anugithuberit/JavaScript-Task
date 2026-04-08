const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('productAdded', (product) => {
    console.log("Product saved to database");
});

eventEmitter.on('productAdded', (product) => {
    console.log("Email notification sent");
});

eventEmitter.on('productAdded', (product) => {
    console.log("Inventory updated");
});

eventEmitter.on('productAdded', (product) => {
    console.log("Product Name:", product);
});

eventEmitter.emit('productAdded', 'Laptop');
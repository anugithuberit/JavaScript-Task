// Import EventEmitter
const EventEmitter = require('events');

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// Create event listener for "userLogin"
eventEmitter.on('userLogin', (username) => {
    const time = new Date().toLocaleTimeString();

    console.log("User Login Event Triggered");
    console.log("User:", username);
    console.log("Time:", time);
    console.log("------------------------");
});

// Trigger the event with different users
eventEmitter.emit('userLogin', 'John');
eventEmitter.emit('userLogin', 'Sara');
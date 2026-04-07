const EventEmitter = require('events')

const eventEmitter = new EventEmitter();

eventEmitter.on('greet', (user) => {
    console.log(`hey! ${user} How you doing these days?`);
    
})
eventEmitter.emit('greet','Ayush')

eventEmitter.once('pushNotify', () => {

    console.log("yoooyooyoyoyo");
    
})
eventEmitter.emit("pushNotify")
eventEmitter.emit("pushNotify")
eventEmitter.emit("pushNotify")


const { error } = require("console");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on('Error', (err) => {
    console.error(`error occured : ${err}`)

})

eventEmitter.emit('Error', new Error("something went wrong"))
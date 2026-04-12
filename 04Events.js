const EventEmitter =  require("events");

class Chat extends EventEmitter{
    sendMessages(msg){
        console.log(`message sent: ${msg}`);
        setTimeout(() => {
            this.emit('messageReceived', msg);
            
        }, 3000);
        
    }
}

const chat = new Chat();

chat.on('messageReceived',(msg) => {
    console.log(`new message : ${msg}`);
    

})

chat.sendMessages("kya h chutiye")
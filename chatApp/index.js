const ChatRoom = require("./chatRoom");

const chat = new ChatRoom();

chat.on("join", (user) => {
    console.log(`${user} has joined the chat`);
    
})

chat.on("sendMessage", (user,message) =>{
    console.log(`${user } has sent : ${message}`);
    
})

chat.on('leave', (user) => {
    console.log(`${user} has left the chat`);
    
})


// simulating


chat.join("ayush")
chat.join("john")

chat.sendMessage('ayush', "ey whats up dood")
chat.sendMessage('john','hey im good what about you bro?')

chat.leave('ayush')
chat.sendMessage("john", 'hell no u ghosted me')
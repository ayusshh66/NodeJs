const { error } = require('node:console')
const fs = require('node:fs')

console.log("start hee kehde");

fs.readFile('sample1.txt','utf-8', (error,data) => {
    if(error) console.log(error);
        else console.log('the result is ', data);
        
    
})

console.log("end hee kehde")

const fs = require('fs')

// console.log(fs)
// this utf- makes the file in human readable form, else it will be in some number coded
// const content = fs.readFileSync('text.txt', 'utf-8')
// console.log(content);

// writefilesync is to write , and appendfilesync is to append text in already made file

// fs.writeFileSync('sample1.txt', 'hey there', 'utf-8')
// fs.writeFileSync('sample2.txt',content,'utf-8')
// fs.appendFileSync('sample1.txt','yoooo','utf-8')
// .Dir.creates folder and files 
fs.mkdirSync("uwu/yo/oo",{recursive:true})

//to delete a file
fs.unlinkSync("sample2.txt")
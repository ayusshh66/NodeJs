const {Buffer} = require("buffer");

// allocates a memory space {buffer=memory space}
const buff = Buffer.alloc(4);
// console.log(buff);

const buf = Buffer.from("ayush")
// const st = buf.toString()
// console.log(st);

// Is not cleared (not filled with zeros), May contain old/garbage data that was previously in memory
// const bu = Buffer.allocUnsafe(11)
// console.log(bu);

// const bub = Buffer.alloc(20)

// bub.write("ayushhshsh")
// console.log(bub.toString());


const buff1 = Buffer.from("ayush ")
const buff2 = Buffer.from("is goated")
const addition = Buffer.concat([buff1,buff2])
console.log(addition.toString());


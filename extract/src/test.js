// 12.0.2
const lb = require("bindings")("hello.node")
// const lib = require("./build/Release/hello.node")

// console.log(lib.gre());

// const ref = require("ref")
// const ffi = require("ffi-napi")
// const struct = require("ref-struct-napi")

// let uint8_ptr = ref.refType(ref.types.uint8)

// const avformat = new ffi.Library('Dll1',{
// //const avformat = new ffi.Library('avformat-58',{
//   'e':['int',[]]
//   'extract':['int',['string','']]
// })

// let bf = new Buffer.from("2.mp4",'utf-8')

// let re = avformat.e();
// console.log(re);

// console.log(lib.gre("2.mp4"));
console.log(lb.gre("2.mp4"));

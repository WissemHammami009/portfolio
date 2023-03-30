var crypto = require("crypto");
const { v4: uuidv4 } = require ('uuid');
function genUniqueId() {
    const dateStr = Date
      .now()
      .toString(36); // convert num to base 36 and stringify
  
    const randomStr = Math
      .random()
      .toString(36)
      .substring(2, 10); // start at index 2 to skip decimal point
  
    const complementStr = crypto
    .randomBytes(4).
    toString('hex');

    return `${dateStr}-${randomStr}-${complementStr}`;
  }

  const randomId = function(length = 6) {
    return Math.random().toString(36).substring(2, length+2);
  };
  
  const date =()=>{
    let str = new Date()
    str = String(str)
    str = str.substr(0,24)
    return str
  }
  const generate5digit = ()=>{
  // Generate a random UUID
    let id = uuidv4 (); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
    return id
  }
  module.exports = {generate5digit,date,genUniqueId,randomId}
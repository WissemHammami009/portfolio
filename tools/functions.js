var crypto = require("crypto");

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
  
  module.exports = {genUniqueId,randomId}
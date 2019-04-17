const hcrypt = require('node-hcrypt');
const crypto = new hcrypt.Crypto();

const key = crypto.export();

const operator = new hcrypt.Operator(key);

const oneCrypted = crypto.encrypt(1);
const zeroCrypted = crypto.encrypt(0);

const cryptedResult = operator.fullAdd('', oneCrypted, oneCrypted);

const finalResult = crypto.decrypt(cryptedResult[0]);
const finalResultCarry = crypto.decrypt(cryptedResult[1]);

console.log(finalResult + 2 * finalResultCarry);
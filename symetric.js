const assert = require('assert');
const crypto = require('crypto');

const algorithm = 'aes256';
const inputEncoding = 'utf8';
const outputEncoding = 'hex';


const key = 'ciw7p02f70000ysjon7gztjn7';
const text = 'hello world !';

console.log(`Encrypting "${text}" with key "${key}" using ${algorithm}`);

const cipher = crypto.createCipher(algorithm, key);
let ciphered = cipher.update(text, inputEncoding, outputEncoding);
ciphered += cipher.final(outputEncoding);

console.log(`Symetric encryption in ${outputEncoding} is ${ciphered}`);

const decipher = crypto.createDecipher(algorithm, key);
let deciphered = decipher.update(ciphered, outputEncoding, inputEncoding);
deciphered += decipher.final(inputEncoding);

console.log(`Decrypted: ${deciphered}`);

assert.equal(deciphered, text, 'Deciphered text does not match!');
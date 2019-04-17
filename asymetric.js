const ursa = require('ursa-purejs');

function printKeyPair(keyPair) {
  console.log('Private key: ', keyPair.private.toPrivatePem().toString('ascii'));
  console.log('Public key: ', keyPair.public.toPublicPem().toString('ascii'));
}

function createKeyPair() {
  const key = ursa.generatePrivateKey(1024, 65537);
  return {private: ursa.createPrivateKey(key.toPrivatePem()), public: ursa.createPublicKey(key.toPublicPem())};
}

const alice = createKeyPair();
const bob = createKeyPair();

console.log('Alice key pair: ');
printKeyPair(alice);
console.log('Bob key pair: ');
printKeyPair(bob);

const msg = 'Hello world !';

const enc = alice.public.encrypt(msg, 'utf8', 'base64');
const sig = bob.private.hashAndSign('sha256', msg, 'utf8', 'base64');

console.log('encrypted', enc);
console.log('signed', sig, '\n');

const rcv = alice.private.decrypt(enc, 'base64', 'utf8');
console.log(`Decrypted "${rcv}"`);
const rcv64 = Buffer.from(rcv).toString('base64');
if (!bob.public.hashAndVerify('sha256', rcv64, sig, 'base64')) {
  console.error('It\'s not bob message');
} else {
  console.log('It\'s bob message');
}
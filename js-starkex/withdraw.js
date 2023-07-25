const starkwareCrypto = require('@starkware-industries/starkware-crypto-utils');
const perpetualMsgs = require("./stark-perpetual/src/services/perpetual/public/js/perpetual_messages");
const sigLib = require("./stark-perpetual/src/starkware/crypto/signature/src/js/signature")

let privateKey = "0xd41644a370401ecf3d51d0c9cf3d8ff6cbce1a2483173b8900ea89faa5cfe0";
privateKey = privateKey.substring(2);

console.log("starkex private key - ", privateKey);
const keyPair = starkwareCrypto.ec.keyFromPrivate(privateKey, 'hex');
const publicKey = starkwareCrypto.ec.keyFromPublic(
    keyPair.getPublic(true, 'hex'),
    'hex'
);
const publicKeyX = publicKey.pub.getX();

console.log("starkex public key - ", publicKeyX.toString(16));


let calldata = {
    assetIdCollateral: "286442224669982855773917167725901379555005478797788066723536016706544965407",
    position_id: 1,
    eth_address: "0xB6aD5EfBd6aDfa29dEfad5BC0f8cE0ad57d4c5Fb",
    nonce: 10,
    expiration_timestamp: 20000000,
    amount: 1000000000,
}

const msgHash = perpetualMsgs.getPerpetualWithdrawalToAddressMessage(calldata.assetIdCollateral,calldata.position_id,calldata.eth_address,calldata.nonce,calldata.expiration_timestamp,calldata.amount);
console.log("msghas")

const msgSignature = sigLib.sign(keyPair, msgHash)

const { r, s } = msgSignature;

console.log("Signature (r) -", r.toString(16))
console.log("Signature (s) -", s.toString(16))
const isTrue = sigLib.verify(publicKey, msgHash, msgSignature)
console.log("Checking the signature is it correct or not ----", isTrue);
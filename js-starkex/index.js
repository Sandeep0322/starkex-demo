const perpetualMsgs = require("./stark-perpetual/src/services/perpetual/public/js/perpetual_messages");
const sigLib = require("./stark-perpetual/src/starkware/crypto/signature/src/js/signature")
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/2ff47e51ff1f4804865ba892c7efc70c'));
const {ec} = require("starknet");
const main = async () => {
    console.log(web3.utils.toChecksumAddress("0xfc66fc912bb51d8a60cfbabb051e9bd8b68e223b"))
    const data = { 
        assetId: "286442224669982855773917167725901379555005478797788066723536016706544965407",
        assetIdFee: 0,
        receiverPublicKey: "2825868930652315540133093693348064822157481518754303749560050236804923333506",
        senderPositionId: 1222321123,
        receiverPositionId: 41223111122,
        srcFeePositionId: 1222321123,
        nonce: 0,
        amount: 10000000,
        maxAmountFee: 0,
        expirationTimestamp: 20000000}
    const msgHash = perpetualMsgs.getPerpetualTransferMessage(data.assetId,data.assetIdFee,data.receiverPublicKey,data.senderPositionId,data.receiverPositionId,data.srcFeePositionId,data.nonce,data.amount,data.maxAmountFee,data.expirationTimestamp)
    console.log("msgHash",msgHash)
    const keyPair = ec.getKeyPair("0xd41644a370401ecf3d51d0c9cf3d8ff6cbce1a2483173b8900ea89faa5cfe0")
    sig = sigLib.sign(keyPair, msgHash)
    let r = await web3.utils.toHex(sig.r)
    let s = await web3.utils.toHex(sig.s)
    console.log("sig",r,s,sig)
    sigLib.verify(keyPair, msgHash, sig)
    console.log("done")
}
main();
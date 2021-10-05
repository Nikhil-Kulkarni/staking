require('dotenv').config();
const Web3 = require('web3');

const API_URL = process.env.INFURA_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY

const web3 = new Web3(API_URL);

const contract = require('../artifacts/contracts/StakingNFT.sol/StakingNFT.json');

const contractAddress = '0xf61ea9ACE78dBadb6D0881bd9B347970241A05f6';
const stakeContract = new web3.eth.Contract(contract.abi, contractAddress);

async function stakeNFT() {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

    const transaction = {
        from: PUBLIC_KEY,
        to: contractAddress,
        gas: 620000,
        nonce: nonce,
        data: stakeContract.methods.safeTransferFrom(PUBLIC_KEY, "0xf61ea9ACE78dBadb6D0881bd9B347970241A05f6", 321).encodeABI(),
    }

    const signedTransaction = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
    web3.eth.sendSignedTransaction(signedTransaction.rawTransaction, function(err, hash) {
        if (err) {
            console.log('err');
        } else {
            console.log('hash:', hash)
        }
    }).catch(err => {
        console.log('failed:', err);
    })
}
// stakeNFT();

async function fetchOwner() {
    const testOutput = await stakeContract.methods.tokenToStakerMap("0xf61ea9ACE78dBadb6D0881bd9B347970241A05f6", 321).call();
    console.log(testOutput);
};
fetchOwner();
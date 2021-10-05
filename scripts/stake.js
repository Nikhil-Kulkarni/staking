require('dotenv').config();
const Web3 = require('web3');

const API_URL = process.env.INFURA_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY

const web3 = new Web3(API_URL);

const contract = require('../artifacts/contracts/Staking.sol/Staking.json');

const contractAddress = '0x311C71590780027F81C4597Df93dc540AFEB78F3';
const stakeContract = new web3.eth.Contract(contract.abi, contractAddress);

async function stakeTokens(amount) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

    const transaction = {
        from: PUBLIC_KEY,
        to: contractAddress,
        gas: 620000,
        nonce: nonce,
        data: stakeContract.methods.approveAndDeposit(amount).encodeABI(),
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
stakeTokens(10);
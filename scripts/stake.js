require('dotenv').config();
const Web3 = require('web3');

const API_URL = process.env.INFURA_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY

const web3 = new Web3(API_URL);

const contract = require('../artifacts/contracts/StakingNFT.sol/StakingNFT.json');

const contractAddress = '0x5beCe8762a80074929895A20DE45a83d85502b33';
const stakeContract = new web3.eth.Contract(contract.abi, contractAddress);

async function stakeNFT() {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

    const transaction = {
        from: PUBLIC_KEY,
        to: contractAddress,
        gas: 620000,
        nonce: nonce,
        data: stakeContract.methods.safeTransferFrom(PUBLIC_KEY, "0x5beCe8762a80074929895A20DE45a83d85502b33", 321).encodeABI(),
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
    const testOutput = await stakeContract.methods.tokenToStakerMap("0x1cD8d1d79AA869c5e9EA80964ab883EB56785B7c", 321).call();
    console.log(testOutput);
};
fetchOwner();
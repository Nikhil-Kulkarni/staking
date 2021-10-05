/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
module.exports = {
  solidity: "0.8.0",
  defaultNetwork: 'ropsten',
  networks: {
    ropsten: {
      url: process.env.INFURA_URL,
      accounts: [`${process.env.PRIVATE_KEY}`]
    }
  }
};

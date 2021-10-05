async function main() {
    const STK = await ethers.getContractFactory('StakingNFT');
    const stakeToken = await STK.deploy();
    console.log('staking address ' + stakeToken.address);
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
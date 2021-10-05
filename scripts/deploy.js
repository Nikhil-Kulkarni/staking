async function main() {
    const STK = await ethers.getContractFactory('NFT');
    const stakeToken = await STK.deploy();
    console.log('stake address ' + stakeToken.address);
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
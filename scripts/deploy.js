async function main() {
    const STK = await ethers.getContractFactory('STK');
    const stakeToken = await STK.deploy("0xE9aDf4B3C8576d22784662555e6e473594AF5a68");
    console.log('stake address ' + stakeToken.address);
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
async function main() {
    const RWD = await ethers.getContractFactory('STK');
    const STK = await ethers.getContractFactory('RWD');
    const rewardToken = await RWD.deploy();
    const stakeToken = await STK.deploy();
    console.log('stake address ' + stakeToken.address);

    const Staking = await ethers.getContractFactory('Staking');

    const stakingContract = await Staking.deploy(stakeToken.address, rewardToken.address);
    console.log('address:', stakingContract.address);
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Staking.sol";

// staking tokens
contract STK is ERC20 {

    Staking stakingContract;
    
    constructor(
        address stakingContractAddress
    ) ERC20("STK", "STK") {
        stakingContract = Staking(stakingContractAddress);
        _mint(msg.sender, 10000);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        stakingContract.deposit(amount);
    }

}
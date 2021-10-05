pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Rewards token
contract RWD is ERC20 {

    constructor() ERC20("RWD", "RWD") {}

}
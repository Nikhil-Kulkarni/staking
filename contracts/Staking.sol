pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Staking {

    IERC20 public stakingToken;
    IERC20 public rewardsToken;

    uint256 private totalSupply;
    mapping(address => uint256) private balances;

    event Staked(address indexed sender, uint256 amount);
    event Widthdrawn(address indexed sender, uint256 amount);

    constructor(
        address _stakingToken,
        address _rewardsToken
    ) {
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
    }

    // approve and stake in one function
    function approveAndDeposit(uint256 amount) external {
        require(amount > 0, "Cannot stake nothing");
        require(stakingToken.balanceOf(msg.sender) >= amount, "Balance too low");

        totalSupply += amount;
        balances[msg.sender] += amount;

        stakingToken.approve(address(this), amount);
        stakingToken.transferFrom(msg.sender, address(this), amount);

        emit Staked(msg.sender, amount);
    }

    // simple stake. no approval. only bookeeping
    function deposit(uint256 amount) external {
        emit Staked(msg.sender, amount);
    }

    function widthdraw(uint256 amount) external {
        require(amount > 0, "Cannot widthdraw nothing");
        require(balances[msg.sender] >= amount, "Balance too low");

        totalSupply -= amount;
        balances[msg.sender] -= amount;

        stakingToken.transfer(msg.sender, amount);

        emit Widthdrawn(msg.sender, amount);
    }

}
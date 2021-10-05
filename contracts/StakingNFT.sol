pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract StakingNFT is IERC721Receiver {

    event Staked(address indexed sender);
    event Widthdrawn(address indexed sender);
    
    mapping (address => mapping (uint256 => address)) public tokenToStakerMap;

    constructor() {}

    function stake(address owner, uint256 tokenId) internal {
        tokenToStakerMap[msg.sender][tokenId] = owner;

        emit Staked(msg.sender);
    }

    function onERC721Received(address operator, address from, uint256 tokenId, bytes memory data) external override returns (bytes4) {
        // operator is immediate parent aka the NFT (not the user)
        stake(operator, tokenId);
        return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    }

    function widthdraw(address nftAddress, uint256 tokenId) external {
        address staker = tokenToStakerMap[nftAddress][tokenId];
        require(staker == msg.sender, "You are not the OG owner");
        ERC721(nftAddress).safeTransferFrom(address(this), msg.sender, tokenId);

        emit Widthdrawn(msg.sender);
    }

}
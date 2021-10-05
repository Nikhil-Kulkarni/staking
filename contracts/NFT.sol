pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {

    constructor() ERC721("NFT", "NFT") {
        _mint(msg.sender, 321);
    }

}
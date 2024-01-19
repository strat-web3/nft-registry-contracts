// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Registry is Ownable {
    enum AssetType {
        ARTWORK,
        ENS_DOMAIN_NAME,
        COLLECTIBLE,
        ATTESTATION,
        KEY,
        ANY
    }

    enum Status {
        ACTIVE,
        DELETED,
        FROZEN,
        STOLEN,
        LOST,
        MOVED
    }

    struct Asset {
        uint256 network;
        address contractAddress;
        uint256 tokenId;
        string mediaFileHash;
        string tokenURI;
        uint256 AssetType;
        bool tangible;
        bool redeemable;
        uint256 Status;
        address creator;
        address registrar;
        address owner;
        string info;
    }
    Asset[] public assets;

    event Registered(uint256 network, address contractAddress, uint256 tokenId);
    event Edited(uint256 network, address contractAddress, uint256 tokenId);

    constructor() {}

    function addEntry(
        uint256 _network,
        address _contractAddress,
        uint256 _tokenId,
        string memory _mediaFileHash,
        string memory _tokenURI,
        uint256 _AssetType,
        bool _tangible,
        bool _redeemable,
        uint256 _Status,
        address _creator,
        address _registrar,
        address _owner,
        string memory _info
    ) public onlyOwner {
        assets.push(
            Asset({
                network: _network,
                contractAddress: _contractAddress,
                tokenId: _tokenId,
                mediaFileHash: _mediaFileHash,
                tokenURI: _tokenURI,
                AssetType: _AssetType,
                tangible: _tangible,
                redeemable: _redeemable,
                Status: _Status,
                creator: _creator,
                registrar: _registrar,
                owner: _owner,
                info: _info
            })
        );
        emit Registered(_network, _contractAddress, _tokenId);
    }

    receive() external payable {
        revert();
    }

    fallback() external payable {
        revert();
    }
}

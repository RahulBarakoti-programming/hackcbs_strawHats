// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract main {
    struct data {
        address ownerAddress;
        string ipfs;
        string name;
        string description;
        uint256 price;
        string dataType;
        string pass;
    }

    struct Request {
        uint256 id;
        address BuyerAddress;
        address BuyerPublickKey;
    }

    struct DataStatus {
        uint256 id;
        bool status;
        string pass;
    }

    uint256 id;

    mapping(address => uint256[]) Mydata;
    mapping(address => DataStatus[]) PurchasedData;
    mapping(address => Request[]) RequestedData;

    mapping(uint256 => data) Data;

    function addData(
        address _ownerAddress,
        string memory _ipfs,
        string memory _name,
        string memory _description,
        uint256 _price,
        string memory _dataType,
        string memory _pass
    ) public returns (uint256) {
        Data[id] = data(
            _ownerAddress,
            _ipfs,
            _name,
            _description,
            _price,
            _dataType,
            _pass
        );
        Mydata[_ownerAddress].push(id);
        id++;
        return (1);
    }

    function retrieveAllData() public view returns (data[] memory) {
        data[] memory tempData = new data[](id);
        for (uint i = 0; i < id; i++) {
            tempData[i] = Data[i];
        }
        return tempData;
    }

    function retrieveMyData(
        address myAddress
    ) public view returns (uint256[] memory) {
        return Mydata[myAddress];
    }

    function retrieveRequest(
        address myAddress
    ) public view returns (Request[] memory) {
        return RequestedData[myAddress];
    }

    function retrievePurchasedData(
        address myAddress
    ) public view returns (DataStatus[] memory) {
        return PurchasedData[myAddress];
    }

    function acceptRequest(
        uint256 _id,
        string memory _pass,
        address _buyerAddress
    ) public returns (uint256) {
        PurchasedData[_buyerAddress].push(DataStatus(_id, true, _pass));
        return 1;
    }
}

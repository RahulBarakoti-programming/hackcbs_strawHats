// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;


contract DataMarketplace {
    event DataAdded(uint256 indexed id, address indexed owner, string name, uint256 price);
    event RequestCreated(uint256 indexed id, address indexed buyer);
    event RequestAccepted(uint256 indexed id, address indexed buyer);
    
    struct Data {
        address ownerAddress;
        string ipfs;
        string name;
        string description;
        uint256 price;
        string dataType;
        string pass;
        bool isActive; 
    }

    struct Request {
        uint256 id;
        address buyerAddress;
        address buyerPublicKey;
    }

    struct DataStatus {
        uint256 id;
        bool status;
        string pass;
        uint256 purchaseDate;  

    
    
    
    uint256 private _idCounter;

    
    mapping(address => uint256[]) private userOwnedData;
    mapping(address => DataStatus[]) private userPurchasedData;
    mapping(address => Request[]) private userRequests;
    mapping(uint256 => Data) private dataRegistry;


    
   
    modifier onlyDataOwner(uint256 _dataId, address _ownerAddress) {
        require(dataRegistry[_dataId].ownerAddress == _ownerAddress, "Not the data owner");
        _;
    }
    
    
    modifier validDataInput(string memory _ipfs, string memory _name, uint256 _price) {
        require(bytes(_ipfs).length > 0, "IPFS hash cannot be empty");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(_price > 0, "Price must be greater than 0");
        _;
    }

    
    function addData(
        address _ownerAddress,
        string memory _ipfs,
        string memory _name,
        string memory _description,
        uint256 _price,
        string memory _dataType,
        string memory _pass
    ) 
        public 
        validDataInput(_ipfs, _name, _price)
        returns (uint256)
    {
        uint256 newId = _idCounter++;
        
        dataRegistry[newId] = Data({
            ownerAddress: owner,
            ipfs: _ipfs,
            name: _name,
            description: _description,
            price: _price,
            dataType: _dataType,
            pass: _pass,
            isActive: true
        });
        
        userOwnedData[_ownerAddress].push(newId);
        
        emit DataAdded(newId, _ownerAddress, _name, _price);
        _idCounter++;
        return newId;
    } // to add new data

    
    function retrieveAllData() public view returns (Data[] memory) {
        uint256 activeCount = 0;
        
        
        for (uint256 i = 0; i < _idCounter; i++) {
            if (dataRegistry[i].isActive) {
                activeCount++;
            }
        }
        
        Data[] memory activeData = new Data[](activeCount);
        uint256 currentIndex = 0;
        
        
        for (uint256 i = 0; i < _idCounter && currentIndex < activeCount; i++) {
            if (dataRegistry[i].isActive) {
                activeData[currentIndex] = dataRegistry[i];
                currentIndex++;
            }
        }
        
        return activeData;
    }  // to retrieve all data

    
    function retrieveMyData(address _owner) public view returns (uint256[] memory) {
        return userOwnedData[_owner];
    } // to retrieve my data

    
    function retrieveRequests(address _owner) public view returns (Request[] memory) {
        return userRequests[_owner];
    } 

    
    function retrievePurchasedData(address _buyer) public view returns (DataStatus[] memory) {
        return userPurchasedData[_buyer];
    }

   
    function acceptRequest(
        uint256 _dataId,
        string memory _pass,
        address _buyerAddress
    ) 
        public 
        onlyDataOwner(_dataId)
        returns (bool)
    {
        
        require(dataRegistry[_dataId].isActive, "Data is not active");
        
        DataStatus memory newStatus = DataStatus({
            id: _dataId,
            status: true,
            pass: _pass,
            purchaseDate: block.timestamp
        });
        
        userPurchasedData[_buyerAddress].push(newStatus);
        
        emit RequestAccepted(_dataId, _buyerAddress);
        return true;
    }

    
    function deactivateData(uint256 _dataId) public onlyDataOwner(_dataId) {
        require(dataRegistry[_dataId].isActive, "Data already inactive");
        dataRegistry[_dataId].isActive = false;
    }

    
    function getDataDetails(uint256 _dataId) public view returns (
        address owner,
        string memory name,
        string memory description,
        uint256 price,
        string memory dataType,
        bool isActive
    ) {
        Data storage d = dataRegistry[_dataId];
        return (
            d.ownerAddress,
            d.name,
            d.description,
            d.price,
            d.dataType,
            d.isActive
        );
    }
}
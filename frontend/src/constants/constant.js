export const API_URL = 'http://localhost:8000/';
export const JWT_SECRET = "9f4e2b3f64c84e5b672a4f4e6f97e76d5fb6d69e5f5e7f6d78a5d4e6f4f2a7b9"
export const contractAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_dataId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_pass",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_ownerAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_buyerAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_buyerPublicKey",
        "type": "address"
      }
    ],
    "name": "acceptRequest",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_ownerAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_ipfs",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_dataType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_pass",
        "type": "string"
      }
    ],
    "name": "addData",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "DataAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_dataId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_ownerAddress",
        "type": "address"
      }
    ],
    "name": "deactivateData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      }
    ],
    "name": "RequestAccepted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      }
    ],
    "name": "RequestCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_dataId",
        "type": "uint256"
      }
    ],
    "name": "getDataDetails",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "dataType",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveAllData",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "ownerAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "ipfs",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "dataType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "pass",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isActive",
            "type": "bool"
          }
        ],
        "internalType": "struct DataMarketplace.Data[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "retrieveMyData",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_buyer",
        "type": "address"
      }
    ],
    "name": "retrievePurchasedData",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "status",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "pass",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "purchaseDate",
            "type": "uint256"
          }
        ],
        "internalType": "struct DataMarketplace.DataStatus[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "retrieveRequests",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "buyerAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "buyerPublicKey",
            "type": "address"
          }
        ],
        "internalType": "struct DataMarketplace.Request[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
export const contractAddress = '0x2910e325cf29dd912e3476b61ef12f49cb931096'
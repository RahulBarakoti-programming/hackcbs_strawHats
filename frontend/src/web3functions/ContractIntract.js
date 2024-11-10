import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '@/constants/constant';

// Function to get contract instance with MetaMask provider
const getContract = async () => {
  if (!window.ethereum) {
    return {
      code: 404,
      msg: 'MetaMask wallet not found'
    };
  }

  // Use Web3Provider to connect to MetaMask
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // Request account access if necessary
  await provider.send('eth_requestAccounts', []);

  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  return contract;
};

// Function to get all data from the contract
export const getAllData = async () => {
  try {
    const contract = await getContract();
    if (contract.code && contract.code === 404) {
      console.error(contract.msg);
      return;
    }

    const data = await contract.retrieveAllData();
    console.log('Retrieved Data:', data);
    return data;
  } catch (error) {
    console.error("Error retrieving data:", error);
    if (error.data) {
      console.error("Error Data:", error.data);  // Additional error details
    }
  }
};


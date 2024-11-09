import { ethers } from 'ethers';
import axios from 'axios';

const contractAbi = null;
const contractAddress = null;

const getContract = async () => {
  if (!window.ethereum) {
    return {
      code: 404,
      msg: 'meta mask wallet not found'
    };
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  return contract;
}
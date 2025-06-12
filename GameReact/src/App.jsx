import React, { useState } from 'react';
import * as ethers from 'ethers';
import MyToken from './assets/MyToken.json'

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 

export default function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [status, setStatus] = useState('');

 
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      setStatus("Wallet connected");
    } catch (err) {
      console.error(err);
      setStatus("Wallet connection failed");
    }
  };

 
  const generateToken = async () => {
    if (!walletAddress) {
      alert("Connect wallet first");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const myTokenContract = new ethers.Contract(CONTRACT_ADDRESS, MyToken.abi, signer);

      const tx = await myTokenContract.createToken(walletAddress, ethers.utils.parseUnits("100", 18)); 
      setStatus("Transaction sent...");

      await tx.wait();
      setStatus("Tokens minted successfully!");
    } catch (err) {
      console.error(err);
      setStatus("Token generation failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md text-center font-sans">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">MyToken DApp</h2>

  <button
    onClick={connectWallet}
    className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg mb-4"
  >
    {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...` : 'Connect MetaMask'}
  </button>

  <br />

  <button
    onClick={generateToken}
    disabled={!walletAddress}
    className={`px-6 py-2 rounded-lg mt-2 ${
      walletAddress
        ? 'bg-green-600 hover:bg-green-700 text-white'
        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
    }`}
  >
    Generate Token
  </button>

  <p className="mt-6 text-gray-600">Status: {status}</p>
</div>

  );
}

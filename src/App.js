import React, { useState,useEffect, useMemo} from 'react';
import { ethers } from 'ethers';
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";
import CarouselFadeExample from './components/CarouselFadeExample';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from "./components/signup";
import axios from "axios";

const Form = () => {
  // state variables
  const [connectedAddress, setConnectedAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [index, setIndex] = useState(0);
  const [review, setReview] = useState("");
  const [reviews,setReviews] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedAddress,setSelectedAddress] = useState("")
  const [ipfsData, setIpfsData] = useState([]);



const ERC_abi = useMemo(() => [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "REVIEW_COST_ETHER",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_review",
				"type": "string"
			}
		],
		"name": "addReview",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "addresses",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllAddresses",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getReview",
		"outputs": [
			{
				"internalType": "address",
				"name": "reviewer",
				"type": "address"
			},
			{
				"internalType": "string[]",
				"name": "_review",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "people",
		"outputs": [
			{
				"internalType": "address",
				"name": "reviewer",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
],[]);

const contractAddress = "0x680374c9F96641d87b53327b926B5A9c1Ae9CdA0"

  useEffect(() => {
    getPics();
  }, []); // Call getPics when component mounts


const getPics = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/upload`);
      if (response.data) {
        setIpfsData(response.data);
      } else {
        console.error('Error fetching photo data: Invalid response');
      }
    } catch (error) {
      console.error('Error fetching photo data:', error);
    }
  };




  //we use this to display all the reviews
  useEffect(() => {
  const fetchData = async () => {
    try {
      const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/4c2923555eab4c96b92c280bfffa8454");
  

      const contract = new ethers.Contract(contractAddress, ERC_abi, provider);
      const rr = await contract.getAllAddresses();
      setAddresses(rr);

   
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  fetchData();
}, [ERC_abi]); // Empty dependency array means this effect will only run once after the component mounts

useEffect(() => {
    const fetchReviews = async () => {
     try {
        const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/4c2923555eab4c96b92c280bfffa8454");
          
      
    const contract = new ethers.Contract(contractAddress, ERC_abi, provider);
    const selectedAddress = addresses[index % addresses.length];
    
    // Check if selectedAddress is valid
    if (selectedAddress) {
      const fetchedReviews = await contract.getReview(selectedAddress);
      const words = fetchedReviews.toString().split(",");
      setReviews(words.slice(1));
	  
	  
    } else {
      console.error("Selected address is null or undefined");
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
     
    };

    fetchReviews();
  }, [index, addresses,ERC_abi]);


  
  const connectMetamask = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setConnectedAddress(account);
      setIsConnected(true);
      // Update addresses state after connecting
    const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/4c2923555eab4c96b92c280bfffa8454");
     
	const privateKey = "5ccb69e0e14929628bdbdd4fbb1159f730f55c26eea04f8f370e6664546a5786";
    
      const wallet = new ethers.Wallet(privateKey,provider)

	
    
      const contract = new ethers.Contract(contractAddress, ERC_abi, wallet);
      const rr = await contract.getAllAddresses();
      setAddresses(rr);
    } catch (error) {
      console.log("Error connecting to MetaMask:", error);
    }
  } else {
    console.log("MetaMask not detected.");
  }
};


 

  const write = async () => {
	  
    

    const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/4c2923555eab4c96b92c280bfffa8454");
 
    
    const privateKey = "5ccb69e0e14929628bdbdd4fbb1159f730f55c26eea04f8f370e6664546a5786";
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, ERC_abi, wallet);
	console.log(selectedAddress)
    console.log(connectedAddress)

    const transaction = await contract.addReview(selectedAddress || connectedAddress, review);
    await transaction.wait();
	alert("okay its going on the blockchcain","you good");
    console.log(transaction);
    console.log(review)
  }

   // Navigate to the next address
  const next = () => {
    setIndex((index + 1) % addresses.length);
  };

  // Navigate to the previous address
  const last = () => {
    setIndex((index - 1 + addresses.length) % addresses.length);
  };

  console.log(last)
  console.log(next)
  const handleAddressClick = async(address) => {


    setSelectedAddress(address);
console.log(address)
	
    try {
      const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/4c2923555eab4c96b92c280bfffa8454");
    
    
      const contract = new ethers.Contract(contractAddress, ERC_abi, provider);
      const fetchedReviews = await contract.getReview(address);
      const words = fetchedReviews.toString().split(",");
      setReviews(words.slice(1));
	  console.log({reviews})
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  


return (
  <div style={{ display: "flex", justifyContent: "center" }}>
      <Signup />
      <div style={{ display: "flex", flexDirection: "row", gap: "10%" }}>
        <div>
          <button onClick={connectMetamask} title='Connect to MetaMask'>Connect</button>
          {isConnected && (
            <div>
              <input value={review} onChange={(e) => setReview(e.target.value)} />
              <br />
              {connectedAddress}
              <br />
              <button onClick={write}>Write to chain</button>
            </div>
          )}
        </div>
        <div className='other'>
         <CarouselFadeExample
  addresses={ipfsData.map(item => item.address)}
  ipfsHash={ipfsData.map(item => item.ipfs)}
setSelectedAddress={setSelectedAddress}
handleAddressClick={handleAddressClick}
// Pass selectedAddress to the carousel
  setReviews={setReviews} // Pass setReviews function to update reviews
  reviews={reviews} // Pass reviews to the carousel
/>
 
          <h2>Selected Address</h2>
          {selectedAddress}
          <h2>Reviews:</h2>
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))}
          </ul>
         

        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Form />
        </header>
      </div>
    </Router>
  );
}


export default App;
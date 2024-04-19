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

  const [sign,setSign] = useState(false);
const [compShow,setCompShow] = useState(false);


const ERC_abi = useMemo(() => [
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
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
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
	}
],[]);

const contractAddress = "0x5BB7430b1f7356BF0aD02A1aEb25888c2A8Ad6be"

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
    alert("naw pick a address")
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
      show()
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
    try {
        if (!selectedAddress || selectedAddress === '') {
          alert("choose an address")
            console.error("Please provide a valid selectedAddress.");
            return;
        }

        const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/4c2923555eab4c96b92c280bfffa8454");
        const privateKey = "5ccb69e0e14929628bdbdd4fbb1159f730f55c26eea04f8f370e6664546a5786";
        const wallet = new ethers.Wallet(privateKey, provider);

        const addressToUse = selectedAddress || connectedAddress;

        if (!addressToUse || addressToUse === '') {
            console.error("No address available to proceed.");
            return;
        }

        const contract = new ethers.Contract(contractAddress, ERC_abi, wallet);

        console.log("Selected Address:", addressToUse);
        console.log("Connected Address:", connectedAddress);

        const transaction = await contract.addReview(addressToUse, review);

        await transaction.wait();
        console.log("Transaction successful:", transaction);
        alert("The review has been added to the blockchain. You're good to go!");
        console.log("Review:", review);
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
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

  const signTrue  = async() =>{
    setSign(true)
  }

    const show = ()=>{
    setCompShow(true)
  }


return (
  <div className="form-container" style={{ display: "flex", justifyContent: "center" }}>
          <p>If you have an account just connect your wallet if no account sign up to leave a review </p>
          
          <div style={{ display: "flex", flexDirection: "row",  justifyItems:"space-between"}}>
            <div  className="metamask-container">
            { !sign && <button onClick={signTrue}> signup</button>
}

          {
            sign&&

          
          <div style={{ display: "flex", justifyContent:"row" }} >

      
        <Signup />

        
      </div>}
     {!sign && <button onClick={connectMetamask} title='Connect to MetaMask'>Connect</button>
}    
          {isConnected && (
            <div>
              <input value={review} onChange={(e) => setReview(e.target.value)} />
              <br />
              {(connectedAddress)&& (
                <p>you are connected</p>
          )}
              <br />
              <button onClick={write}>Write to chain</button>
            </div>
          )}
        </div>
          <div className="flex-container" style={{ display: "flex", flexDirection: "row", gap: "10%" }}>
       
       { compShow && <div className='other'>
          
         <CarouselFadeExample
  addresses={ipfsData.map(item => item.address)}
  ipfsHash={ipfsData.map(item => item.ipfs)}
setSelectedAddress={setSelectedAddress}
handleAddressClick={handleAddressClick}
// Pass selectedAddress to the carousel
  setReviews={setReviews} // Pass setReviews function to update reviews
  reviews={reviews} // Pass reviews to the carousel
/>
 
          <h2>Review This Address</h2>
          {selectedAddress}
          <h2>Reviews:</h2>
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))}
          </ul>
         
            
        </div>}
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
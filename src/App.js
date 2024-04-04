import React, { useState,useEffect} from 'react';
import { ethers } from 'ethers';
import "./App.css"








const Form = () => {
  // state variables
  const [connectedAddress, setConnectedAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [index, setIndex] = useState(0);
  const [review, setReview] = useState("");
  const [reviews,setReviews] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedAddress,setSelectedAddress] = useState("")



  //we use this to display all the reviews
  useEffect(() => {
  const fetchData = async () => {
    try {
      const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/4c2923555eab4c96b92c280bfffa8454");
        const ERC_abi =[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
	}
]
      const contractAddress = "0x78D656d07Aa97ca5892342823aC8d5923753dbC0";
      const contract = new ethers.Contract(contractAddress, ERC_abi, provider);
      const rr = await contract.getAllAddresses();
      setAddresses(rr);

   
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  fetchData();
}, []); // Empty dependency array means this effect will only run once after the component mounts

useEffect(() => {
    const fetchReviews = async () => {
     try {
        const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/4c2923555eab4c96b92c280bfffa8454");
          const ERC_abi =[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
	}
]
       const contractAddress = "0x78D656d07Aa97ca5892342823aC8d5923753dbC0";
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
  }, [index, addresses]);


  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setConnectedAddress(account);
           setIsConnected(true);
      } catch (error) {
        console.log("Error connecting to MetaMask:", error);
      }
    } else {
      console.log("MetaMask not detected.");
    }
  };


 

  const write = async () => {
	  
    

    const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/4c2923555eab4c96b92c280bfffa8454");
    const ERC_abi =[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
	}
]
    const contractAddress = "0x78D656d07Aa97ca5892342823aC8d5923753dbC0";
    const privateKey = "5ccb69e0e14929628bdbdd4fbb1159f730f55c26eea04f8f370e6664546a5786";
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, ERC_abi, wallet);
	console.log(selectedAddress)
    console.log(connectedAddress)
    const transaction = await contract.addReview(selectedAddress || connectedAddress, review);
    await transaction.wait();
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
const handleAddressClick = async (address) => {
    setSelectedAddress(address);
    try {
      const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/4c2923555eab4c96b92c280bfffa8454");
      const ERC_abi=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
	}
] ; // Your ERC_abi array here
      const contractAddress = "0x78D656d07Aa97ca5892342823aC8d5923753dbC0";
      const contract = new ethers.Contract(contractAddress, ERC_abi, provider);
      const fetchedReviews = await contract.getReview(address);
      const words = fetchedReviews.toString().split(",");
      setReviews(words.slice(1));
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };



  return (
	  <div>
<div style={{ display: "flex", flexDirection: "row" }}>
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

      <div>
       <div>
		<h2>selectedAddress</h2>
		{selectedAddress}
	   </div>
        
        <h2>All Addresses:</h2>
        <ul>
          {addresses.map((address, idx) => (
			  <li key={idx} onClick={() => handleAddressClick(address)}>{address}</li>
			  ))}
        </ul>
      </div>

      <div>
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
    <div className="App">
      <header className="App-header">
 
        
              <Form />
            
       
      </header>
    </div>
  );
}

export default App;

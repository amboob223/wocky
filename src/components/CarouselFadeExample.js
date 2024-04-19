import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { ethers } from 'ethers';
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';


const CarouselFadeExample = ({ addresses, ipfsHash, setSelectedAddress,handleAddressClick,setReviews }) => {
  const ERC_abi = [
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
]
const contractAddress = "0x5BB7430b1f7356BF0aD02A1aEb25888c2A8Ad6be"

  if (!ipfsHash || ipfsHash.length === 0) {
    return <div>No images available</div>;
  }
   const fetchReviews = async (address) => {
    try {
      const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/4c2923555eab4c96b92c280bfffa8454");
  const contract = new ethers.Contract(contractAddress, ERC_abi, provider);
      const fetchedReviews = await contract.getReview(address);
      const words = fetchedReviews.toString().split(",");
      return words.slice(1);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }
  };

  const handleSelect = async (selectedIndex, e) => {
    // Update the selected address based on the new index
    const selectedAddress = addresses[selectedIndex];
    setSelectedAddress(selectedAddress);

    try {
      // Fetch reviews for the selected address
      const fetchedReviews = await fetchReviews(selectedAddress);
      // Set the reviews state if needed
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <Carousel onSelect={handleSelect}  interval={null}>
      {addresses.map((address, index) => (
        <Carousel.Item key={index}>
          <div style={{ position: 'relative' }}>
            {/* Use ipfsHash directly as the src */}
            <img
              className='pic'
              src={ipfsHash[index]}
              alt={`carousel-item-${index}`}
              width="300px"
              style={{ display: 'block', margin: '0 auto' }}
             onClick={() => {
                setSelectedAddress(address);
              
              }} 
            />
            <div className="carousel-caption" style={{background: "rgba(0, 0, 0, 0.5)"}}>
              <p className='caption-text'>{address}</p>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselFadeExample;

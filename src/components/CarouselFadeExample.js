import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from "../images/beltline.jpeg";
import img2 from "../images/Abdul.jpg"
import { ethers } from "ethers";
import { Link } from 'react-router-dom';

const CarouselFadeExample = ({ addresses, handleAddressClick, setSelectedAddress, setReviews }) => {
  const fetchReviews = async (address) => {
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
] ;
      const contractAddress = "0xf779dED94139c7024A5DF3B1012A6c1Eb0025ABA";
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
    <Carousel onSelect={handleSelect} interval={null}>
      {addresses.map((address, index,review) => (
        <Carousel.Item key={index}>
          <Link to='/help'>
            <div style={{ position: 'relative' }}>
              {/* Use different images based on index */}
              <img
                className='pic'
                src={index === 0 ? img1 : index === 1 ? img2 : img1}
                alt={`carousel-item-${index}`}
                width="300px" // Adjust width of image
                style={{ display: 'block', margin: '0 auto' }} // Center the image horizontally
                onClick={() => handleAddressClick(address)} 
              />
              <div className="carousel-caption" style={{background: "rgba(0, 0, 0, 0.5)"}}>
                {/* <h3 className="caption-text">{address}</h3> */}
                <p className='caption-text'>leave a Review</p>
              </div>
            </div>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselFadeExample;

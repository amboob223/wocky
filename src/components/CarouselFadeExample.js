// CarouselFadeExample.js
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const CarouselFadeExample = ({ addresses, ipfsHash, setSelectedAddress, setReviews }) => {

  // Use ipfsHash to construct the image source URL
  const imageUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

console.log(imageUrl)
  return (
    <Carousel interval={null}>
      {addresses.map((address, index) => (
        <Carousel.Item key={index}>
          <div style={{ position: 'relative' }}>
            {/* Use imageUrl as the src */}
            <img
              className='pic'
              src={imageUrl}
              alt={`carousel-item-${index}`}
              width="300px"
              style={{ display: 'block', margin: '0 auto' }}
              onClick={() => setSelectedAddress(address)} 
            />
            <div className="carousel-caption" style={{background: "rgba(0, 0, 0, 0.5)"}}>
              <p className='caption-text'>the user name here</p>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselFadeExample;

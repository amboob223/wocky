import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';


const CarouselFadeExample = ({ addresses, ipfsHash, setSelectedAddress }) => {
  if (!ipfsHash || ipfsHash.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <Carousel interval={null}>
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
              onClick={() => setSelectedAddress(address)} 
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

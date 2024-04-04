// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Wock {
    // Contract variables
    mapping(address => Person) public people;
    address[] public addresses; // Array to store keys (addresses)
    
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // Review 
    struct Person {
        address reviewer;
        string[] reviews;
    }

    // Function to add review
    function addReview(address _address, string memory _review) public {
        Person storage person = people[_address];
        person.reviewer = _address;
        person.reviews.push(_review); // here we add the review
        
        // Add the address to the addresses array if it doesn't exist already
        if (people[_address].reviews.length == 1) { // if the length is one then we have something in there and it dosent have to push already
            addresses.push(_address);
        }
    }

    // Function to get review
    function getReview(address _address) public view returns (address reviewer, string[] memory _review) {
        Person storage person = people[_address];
        return (person.reviewer, person.reviews);
    }

    // Function to get all addresses
    function getAllAddresses() public view returns (address[] memory) {
        return addresses;
    }
}

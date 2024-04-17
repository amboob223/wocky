// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Wock {
    // Contract variables
    mapping(address => Person) public people;
    address[] public addresses; // Array to store keys (addresses)
    
    address public owner;
    uint public constant REVIEW_COST_ETHER = 0.01 ether; // Cost in ether for submitting a review (0.01 ether is approximately $5 at the time of writing)

    constructor(address _owner) {
        owner = _owner;
    }

    // Review 
    struct Person {
        address reviewer;
        string[] reviews;
    }

    // Function to add review
 function addReview(address _address, string memory _review) public payable {
    require(msg.value >= REVIEW_COST_ETHER || msg.sender == owner, "Insufficient payment");
    
    Person storage person = people[_address];
    person.reviewer = msg.sender; // Store the reviewer's address
    person.reviews.push(_review); // here we add the review
    
    // Add the address to the addresses array if it doesn't exist already
    if (people[_address].reviews.length == 1) {
        addresses.push(_address);
    }
    
    // Refund excess payment
    if (msg.value > REVIEW_COST_ETHER) {
        payable(msg.sender).transfer(msg.value - REVIEW_COST_ETHER);
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
    
    // Function to withdraw contract balance (for owner)
    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Wock {
    // Contract variables
    mapping(address => Person) public people;
    address[] public addresses; // Array to store keys (addresses)
    
    address public owner;
    uint public constant REVIEW_COST_ETHER = 0.01 ether; // Cost in ether for submitting a review (0.01 ether is approximately $5 at the time of writing)

    constructor(address _owner) {
        owner = _owner;
    }

    // Review 
    struct Person {
        address reviewer;
        string[] reviews;
    }

    // Function to add review
 function addReview(address _address, string memory _review) public payable {
    require(msg.value >= REVIEW_COST_ETHER || msg.sender == owner, "Insufficient payment");
    
    Person storage person = people[_address];
    person.reviewer = msg.sender; // Store the reviewer's address
    person.reviews.push(_review); // here we add the review
    
    // Add the address to the addresses array if it doesn't exist already
    if (people[_address].reviews.length == 1) {
        addresses.push(_address);
    }
    
    // Refund excess payment
    if (msg.value > REVIEW_COST_ETHER) {
        payable(msg.sender).transfer(msg.value - REVIEW_COST_ETHER);
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
    
    // Function to withdraw contract balance (for owner)
    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract wock {
    //contract variables
    address[] public addresses;
    address public owner;

    constructor() {
        owner = msg.sender;
    }
    //review
    struct Person {
        address reviewer;
        string[] reviews;
    } //on a struct no access keywords

    mapping(address => Person) public people;

    //now we need the following functions
    //add address to the addresses array and
    function addReview(address _address, string memory _review) public {
        Person storage newPerson = people[_address];
        newPerson.reviewer = _address;
        newPerson.reviews.push(_review);
        addresses.push(_address);
    }

    function getReview(
        address _address
    ) public view returns (address reviewer, string[] memory _review) {
        Person storage person = people[_address];
        return (person.reviewer, person.reviews);
    }

    //
}

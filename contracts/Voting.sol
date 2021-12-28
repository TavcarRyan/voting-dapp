//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Voting {

    enum Membership { DEFAULT, CITIZEN, DIAMOND }

    event NewCandidates(string[] candidateList);

    string[] public candidateList;
    uint256 public totalVotesCasted;

    mapping(address => Membership) private hosts;
    mapping(string => uint256) public votesReceived;

    function setCandidates (string[] memory _candidateNames) public {
        for (uint i = 0; i < _candidateNames.length; i++) {
            candidateList.push(_candidateNames[i]);
        }
        emit NewCandidates(_candidateNames);
    }

    function totalVotes (string memory _candidate) public view returns (uint256) {
        return votesReceived[_candidate];
    }

    function voteForCandidate(string memory _candidate) public {
        require(validateCandidate(_candidate));
        totalVotesCasted += 1;
        votesReceived[_candidate] += 1;
    }

    function validateCandidate (string memory _candidate) private view returns (bool) {
        for(uint i = 0; i < candidateList.length; i++) {
            if (keccak256(abi.encodePacked(candidateList[i])) == keccak256(abi.encodePacked(_candidate))) {
                return true;
            }
        }
        return false;
    }

    function _getMembershipKeyByValue(Membership _membership) private pure returns (string memory) {
        // Loop through possible options
        if (Membership.DEFAULT == _membership) return "Free";
        if (Membership.CITIZEN == _membership) return "Citizen";
        if (Membership.DIAMOND == _membership) return "Diamond";

    }

    function getMembership() public view returns (string memory) {
        Membership _membership = hosts[msg.sender]; 
        return _getMembershipKeyByValue(_membership);
    }
}
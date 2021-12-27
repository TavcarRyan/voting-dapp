//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Voting {

    event NewCandidates(string[] candidateList);

    string[] public candidateList;
    uint256 public totalVotesCasted;

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
}
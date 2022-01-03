//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Poll { 

    struct Voting{
        address chairperson;
        string title;
        uint256 expiryBlockNumber;
        uint256 optionsAmount;
        string[] options;
        uint256[] optionVotes;
        uint256 totalVotes;
    }

    uint256 public totalPolls;
    mapping (uint => Voting) public polls;
    mapping (uint => address) public pollToChairperson;
    mapping (address => uint) public chairpersonPollCount;

    function _createPoll(string memory _title, string[] memory  _optionTitles, uint _expiryBlockNumber, uint _id) public {
        uint[] memory defaultVotes = getDefaultVoteArray(_optionTitles);
        polls[_id] = Voting(msg.sender, _title, _expiryBlockNumber, _optionTitles.length, _optionTitles, defaultVotes, 0);
        pollToChairperson[_id];
    }

    function getDefaultVoteArray(string[] memory _optionTitles) private pure returns(uint[] memory) {
        uint _totalElements;
        for (uint i = 0; i < _optionTitles.length; i++) {
            _totalElements++;
        }
        uint[] memory _defaultVotes = new uint[](_totalElements);
        return _defaultVotes;
    }

    function getPoll(uint _id) public view returns(Voting memory) {
        return polls[_id];
    }

    function vote(uint _option, uint _id) public view {
        Voting memory poll = polls[_id];
        poll.optionVotes[_option] += 1;
        poll.totalVotes += 1;
        poll.totalVotes += 1;
    }
}
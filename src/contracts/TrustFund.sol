
pragma solidity ^0.8.0;

//TrustFund smart contract for decentralized fundraising
contract TrustFund {

    //structure to store campaign details
    struct Campaign {
        address creator;
        string title;
        string description;
        uint256 goal;
        uint256 amountRaised;
        uint256 donorCount;
        bool withdrawn;
    }

    //lets make an array to store all campaigns
    Campaign[] public campaigns;

    //now we map to track donations per campaign per user
    mapping(uint256 => mapping(address => uint256)) public donations;

    //createing a new fundraising campaign
    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _goal
    ) public {
        campaigns.push(
            Campaign({
                creator: msg.sender,
                title: _title,
                description: _description,
                goal: _goal,
                amountRaised: 0,
                donorCount: 0,
                withdrawn: false
            })
        );
    }

    //this allows users to donate BNB to a campaign that is being hosted
    function donateToCampaign(uint256 _id) public payable {
        require(_id < campaigns.length, "Invalid campaign");

        Campaign storage c = campaigns[_id];

        c.amountRaised += msg.value;

        if (donations[_id][msg.sender] == 0) {
            c.donorCount += 1;
        }

        donations[_id][msg.sender] += msg.value;
    }

    //allows campaign creator to withdraw funds
    function withdrawFunds(uint256 _id) public {
        require(_id < campaigns.length, "Invalid campaign");
        Campaign storage c = campaigns[_id];
        require(msg.sender == c.creator, "Not creator");
        require(!c.withdrawn, "Already withdrawn");
        c.withdrawn = true;
        payable(c.creator).transfer(c.amountRaised);
    }

    //this returns total number of campaigns
    function getCampaignCount() public view returns (uint256) {
        return campaigns.length;
    }

    //this returns details of a specific campaign
    function getCampaign(uint256 _id) public view returns (
        address,
        string memory,
        string memory,
        uint256,
        uint256,
        uint256,
        bool
    ) {
        Campaign memory c = campaigns[_id];

        return (
            c.creator,
            c.title,
            c.description,
            c.goal,
            c.amountRaised,
            c.donorCount,
            c.withdrawn
        );
    }
}
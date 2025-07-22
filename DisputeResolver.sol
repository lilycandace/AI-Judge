pragma solidity ^0.8.0;

contract DisputeResolver {
    address public partyA;
    address public partyB;
    string public agreementText;
    uint public deadline;
    uint public amount;
    address public resolver;

    enum DisputeStatus { Active, Resolved, Refunded }
    DisputeStatus public status;

    constructor(address _partyB, string memory _agreementText, uint _duration) payable {
        require(msg.value > 0, "Deposit required");
        partyA = msg.sender;
        partyB = _partyB;
        agreementText = _agreementText;
        deadline = block.timestamp + _duration;
        amount = msg.value;
        status = DisputeStatus.Active;
        resolver = msg.sender; // temporarily set to creator, replace later
    }

    function resolve(bool inFavorOfB) public {
        require(msg.sender == resolver, "Not authorized");
        require(status == DisputeStatus.Active, "Already resolved");

        if (inFavorOfB) {
            payable(partyB).transfer(amount);
        } else {
            payable(partyA).transfer(amount);
        }

        status = DisputeStatus.Resolved;
    }

    function refund() public {
        require(block.timestamp > deadline, "Too early");
        require(status == DisputeStatus.Active, "Already resolved");
        payable(partyA).transfer(amount);
        status = DisputeStatus.Refunded;
    }
}
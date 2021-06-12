pragma solidity 0.8.4;

contract Payment {
    address transferSource;
    address payable transferDestination;
    uint transferAmount;
    
    constructor() public {
        transferSource = msg.sender;
    }

    event ExecuteTransfer(address payable _transferDestination, address _transferSource, uint _transferAmount);
    
    function newTransaction(address payable _transferDestination) public payable returns (bool){
        transferDestination = _transferDestination;
        transferDestination.transfer(msg.value);
        emit ExecuteTransfer(transferDestination, transferSource, msg.value);
        return true;
    }
    function seeAccountBalance() public payable returns (uint) {
        return transferSource.balance;
    }
}
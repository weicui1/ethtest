pragma solidity ^0.4.2;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract MetaCoin {

	struct client{
        uint cashWallet;
        uint pointWallet;
    }

	mapping (address => client) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function MetaCoin() {
		balances[tx.origin] = client(0,0);
	}


/*
	function sendCoin(address receiver, uint amount) returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	

	function sendFromBank(address sender, address receiver, uint amount) returns(bool sufficient) {
		if (balances[sender] < amount) return false;
		balances[sender] -= amount;
		balances[receiver] += amount;
		Transfer(msg.sender, receiver, amount);
		return true;
	}
*/

	function initBankPoints(address bank, uint amount) returns(bool sufficient) {
		balances[bank] = client(0, amount);
		return true;
	}

	function initClient(address addr) returns(bool sufficient) {
		balances[addr] = client(1, 1);
		return true;
	}

    //send 10% cash to pointbank, bank return point to guest
	function bookByCash(address guest, address hotel, address bank, uint cashAmount) returns(bool sufficient) {
        uint cashToBank = cashAmount /10;
		balances[hotel].cashWallet += cashAmount - cashToBank;

		balances[bank].pointWallet -= cashToBank*10;
		balances[bank].cashWallet += cashToBank;

		balances[guest].pointWallet += cashToBank*10;
		
		return true;
 
	}

    //send 100% point to pointbank, bank return cash to hotel
    function bookByPoint(address guest, address hotel, address bank, uint pointAmount) returns(bool sufficient) {

        uint cashToHotel = pointAmount / 10;
		balances[hotel].cashWallet += cashToHotel;

		balances[bank].pointWallet += pointAmount;
		balances[bank].cashWallet -= cashToHotel;

		balances[guest].pointWallet -= pointAmount;
		
		return true;
	}

	function getBalance(address addr) returns(uint, uint) {
		return (balances[addr].cashWallet, balances[addr].pointWallet);
	}

}

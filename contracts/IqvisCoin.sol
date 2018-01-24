pragma solidity ^0.4.2;

contract IqvisCoin {
	uint256 constant private MAX_UINT256 = 2**256 - 1;
	mapping (address => uint256) balances;
	mapping (address => mapping (address => uint256)) allowed;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);
	event Approval(address indexed _owner, address indexed _spender, uint256 _value);

	uint256 private _totalSupply;
	string private name;
	uint8 private decimals;
	string private symbol;
	string private version = 'H1.0';

	function IqvisCoin() public {
					_totalSupply = 100000000; // Give the creator all initial tokens
	        balances[msg.sender] =  _totalSupply;             // Give the creator all initial tokens
	        name = 'IQVIS';                                   // Set the name for display purposes
	        decimals = 10;                            // Amount of decimals for display purposes
	        symbol = 'IQ';                               // Set the symbol for display purposes
	}

	function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        Transfer(msg.sender, _to, _value);
        return true;
  }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        uint256 allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && allowance >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        Transfer(_from, _to, _value);
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
		}

}

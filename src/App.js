import React, { Component } from 'react'
import _400MMContract from '../build/contracts/IqvisCoin.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const _400MM = contract(_400MMContract)
    _400MM.setProvider(this.state.web3.currentProvider)
    var _400MMInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      _400MM.deployed().then((instance) => {
        _400MMInstance = instance
        return _400MMInstance.balanceOf.call(accounts[0] ,{from: accounts[0]});
      }).then((balance) => {
        document.getElementById("balance").innerHTML = balance;
        let mythis = this;
        this.state.web3.eth.getBalance(accounts[0], function (error, result) {
             if (!error) {
                var ether = mythis.state.web3.fromWei(result);
                document.getElementById("etherBalance").innerHTML = ether.valueOf();
             } else {
               console.error('error');
             }
        })
      })
    })
  }

  directTransferTokens(event){
    let to = this.refs.to1.value;
    let amount = parseInt(this.refs.amount1.value , 10);

    const contract = require('truffle-contract')
    const _400MM = contract(_400MMContract)
    _400MM.setProvider(this.state.web3.currentProvider)
    var _400MMInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      _400MM.deployed().then((instance) => {
        _400MMInstance = instance
        return _400MMInstance.transfer(to , amount ,{from: accounts[0]});
      }).then(()=>{
        return _400MMInstance.balanceOf.call(accounts[0] ,{from: accounts[0]});
      }).then((balance) => {
        document.getElementById("balance").innerHTML = balance;
      })
    });
  }

  render() {
    return (
      <div className="container">
      	<div className="row">
      		<div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      			<header className="h3">IQVISCOIN</header>
      			<blockquote>
      				<span className="pull-left iconwrap"><img className="mt10" src="./qicon.png" role="presentation" /></span>
      				IQVISCOIN<br/><small>Available: <span id="balance">0</span> IQV</small>
      			</blockquote>
      		</div>
      		<div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      			<header className="h3"> Ethereum </header>
      			<blockquote>
      				<span className="pull-left iconwrap"><img className="mt7" src="./eth.png" role="presentation" /></span>
      				Ethereum<br/><small>Available: <span id="etherBalance">0</span> ETH</small>
      			</blockquote>
      		</div>

      	</div>

      	<div className="row linaer-gradient-trans">
      		<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      			<h3 className="h3">IQVISCOIN</h3>
      		</div>
      		<p>&nbsp;</p>
      		<div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
      			<label for="address">Reciever Address</label>
      			<input type="text" ref='to1' id="address" className="form-control" placeholder="Address" />
      		</div>
      		<div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
      			<label for="coins">Number of coins sending</label>
      			<input type="text" ref='amount1' id="coins" className="form-control" placeholder="Number of coins" />
      		</div>
      		<div className="col-xs-12 col-sm-2 col-md-2 col-lg-2">
      			<button onClick={this.directTransferTokens.bind(this)} className="btn btn-block btn-primary btn-lg mt10">Transfer</button>
      		</div>
      		<p>&nbsp;</p>
      	</div>
      	<p>&nbsp;</p>
      	<div className="row">
      		<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      			<h3 className="h3">Order Reciever</h3><br/>
      		</div>
      		<div className="col-xs-12 col-sm-5 col-md-5 col-lg-5 mb10">
      			<label for="walletAddress">0x1C11f6b1A2d1c0b00ad4145eb067184736EB973f</label>
      		</div>
      		<div className="col-xs-12 col-sm-5 col-md-5 col-lg-5 mb10">
      			<label for="walletAmount">1120</label>
      		</div>
      		<div className="col-xs-12 col-sm-2 col-md-2 col-lg-2 mb10">
      			<button type="submit" className="btn btn-block btn-primary btn-lg">Transfer</button>
      		</div>
      		<div className="col-xs-12 col-sm-5 col-md-5 col-lg-5 mb10">
      			<label for="walletAddress">0x1C11f6b1A2d1c0b00ad4145eb067184736EB973f</label>
      		</div>
      		<div className="col-xs-12 col-sm-5 col-md-5 col-lg-5 mb10">
      			<label for="walletAmount">1120</label>
      		</div>
      		<div className="col-xs-12 col-sm-2 col-md-2 col-lg-2 mb10">
      			<button type="submit" className="btn btn-block btn-primary btn-lg">Transfer</button>
      		</div>
      		<div className="col-xs-12 col-sm-5 col-md-5 col-lg-5 mb10">
      			<label for="walletAddress">0x1C11f6b1A2d1c0b00ad4145eb067184736EB973f</label>
      		</div>
      		<div className="col-xs-12 col-sm-5 col-md-5 col-lg-5 mb10">
      			<label for="walletAmount">1120</label>
      		</div>
      		<div className="col-xs-12 col-sm-2 col-md-2 col-lg-2 mb10">
      			<button type="submit" className="btn btn-block btn-primary btn-lg">Transfer</button>
      		</div>
      	</div>
      	<p>&nbsp;</p>
        </div>
    );
  }
  
   transferTokens(event){
      let to = this.refs.to1.value;
      let amount = 2;

      const contract = require('truffle-contract')
      const _400MM = contract(_400MMContract)
      _400MM.setProvider(this.state.web3.currentProvider)
      var _400MMInstance
      this.state.web3.eth.getAccounts((error, accounts) => {
        _400MM.deployed().then((instance) => {
          _400MMInstance = instance
          return _400MMInstance.transfer(to , amount ,{from: accounts[0]});
        })
      })
    }
}

export default App

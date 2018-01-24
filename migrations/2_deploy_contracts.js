var IqvisCoin = artifacts.require("./IqvisCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(IqvisCoin);
};

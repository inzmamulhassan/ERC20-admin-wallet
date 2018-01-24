require('babel-register')

// Rinkeby test network

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      host: "localhost", // Connect to geth on the specified
      port: 8545,
      from: "0x491485040cFD7436AB2f9ae7ff9b475A9f14Deee", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    },
    live: {
      host: "localhost", // Connect to geth on the specified
      from: "0x491485040cFD7436AB2f9ae7ff9b475A9f14Deee", // default address to use for any transaction Truffle makes during migrations
      port: 8546,
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    }
  }
};

// Testrpc

// module.exports = {
//   networks: {
//     development: {
//       host: 'localhost',
//       port: 8545,
//       gas: 6700000,
//       network_id: '*' // Match any network id
//     }
//   }
// }

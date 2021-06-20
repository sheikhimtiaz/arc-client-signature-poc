require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = "vast dignity wave found easily idle flower health pretty budget two fuel";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider(mnemonic, process.env.YOUR_RINKEBY_TEST_URL),
        network_id: "4",
        skipDryRun: true
    },
    goerli: {
      provider: () => {
        return new HDWalletProvider(mnemonic, 'https://goerli.infura.io/v3/' + '258b2ca52f824e3d9f262af50c5b1881')
      },
      network_id: '5', // eslint-disable-line camelcase
      gas: 4465030,
      gasPrice: 10000000000,
    },
  },
  compilers: {
    solc: {
      version: '0.8.4',
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};

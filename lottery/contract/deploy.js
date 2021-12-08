// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'night double elevator clinic number tone milk prosper glance label ice machine clump shallow summer',
    'https://rinkeby.infura.io/v3/2931c78fc46442f7935060c128e99163'
);

// This provider will decide which network
// we will connect with.
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ gas: '10000000', from: accounts[0]});
    
    console.log(interface);
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();
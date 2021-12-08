import Web3 from 'web3';

// Below is deprecated way.
// // A copy of web3 provider come from Metamask
// const web3 = new Web3(window.web3.currentProvider);
// export default web3;

window.ethereum.request({ method: "eth_requestAccounts"});
const web3 = new Web3(window.ethereum);
export default web3;
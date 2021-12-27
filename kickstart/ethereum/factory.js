import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const factory = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xe36c60Ff0E94665A96f1df38613A7a01e03F50b5"
);

export default factory;

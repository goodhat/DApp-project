import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager });
    this.setState({ players });
    this.setState({ balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success..." });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });
    this.setState({ message: "You have been entered!" });
  };

  onClick = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "Waiting on transaction success..." });
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    this.setState({ message: "The winner have been picked." });
  };

  render() {
    web3.eth.getAccounts().then(console.log());
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>
          There are currently {this.state.players.length} people entered,
          competeing to win {web3.utils.fromWei(this.state.balance, "ether")}{" "}
          ether!
        </p>
        <hr />

        <form onSubmit={this.onSubmit}>
          <h4> Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              onChange={(event) => this.setState({ value: event.target.value })}
            />
            <button>Enter</button>
          </div>
        </form>

        <hr />
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>
        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;

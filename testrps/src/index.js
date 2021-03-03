import React, { Component } from "react";
import ReactDOM from "react-dom";
import Player from "./player";
import { Alert } from 'reactstrap';
import "./styles.css";
import "./piplup.css";
import 'bootstrap/dist/css/bootstrap.min.css';

//Variable
const hands = ["rock", "paper", "scissors"];
let p1WinCount = 0;
let p2WinCount = 0;
class App extends Component {

  constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

  state = {
    playerOne: hands[0],
    playerTwo: hands[0],
    winner: ""
  };

//Button Start Onclick
  startGame = () => {
      let counter = 0;
      let gameInterval = setInterval(() => {
        counter++;
        this.setState({
          playerTwo: hands[Math.floor(Math.random() * hands.length)],
          winner: ""
        });
        if (counter > 5) {
          clearInterval(gameInterval);
          this.setState({
            winner: this.selectWinner()
          });
        }
      }, 100);
    };

//Decide the winner
    selectWinner = () => {
    const { playerOne, playerTwo } = this.state;
    if (playerOne === playerTwo) {
      return "Oops it's a Tie!";
    } else if (
      (playerOne === "rock" && playerTwo === "scissors") ||
      (playerOne === "scissors" && playerTwo === "paper") ||
      (playerOne === "paper" && playerTwo === "rock")
    ) {
      return "Player One Win";
    } else {
      return "Player Two Win";
    }
  };

//Decide WinTotal
  winTotal = () => {
    const { playerOne, playerTwo } = this.state;
    if (playerOne === playerTwo) {
      return "Oops it's a Tie!";
    } else if (
      (playerOne === "rock" && playerTwo === "scissors") ||
      (playerOne === "scissors" && playerTwo === "paper") ||
      (playerOne === "paper" && playerTwo === "rock")
    ) {
      p1WinCount++;
      document.getElementById("WinTotal").innerHTML = "Player One Total Score :"+p1WinCount;
      if (p1WinCount >= 3){
      this.restartGame();
      return "Player One Win The Game of Rock Paper Scissors, Congratulation!!";
      }else{
      return "Player One Win";
      }
    } else {
      p2WinCount++;
      document.getElementById("2WinTotal").innerHTML = "Player Two Total Score :"+p2WinCount;
      if (p2WinCount >= 3){
      this.restartGame();
      return "Player Two Win The Game of Rock Paper Scissors, Congratulation!!";
      }else{
      return "Player Two Win";
      }
    }
  };

//restart
  restartGame(){
    p1WinCount = 0;
    p2WinCount = 0;
    document.getElementById("WinTotal").innerHTML = "Player One Total Score : 0";
    document.getElementById("2WinTotal").innerHTML = "Player Two Total Score : 0";
  }
//Chose Hands
  selectWeapon = hand => {
    this.setState({
      playerOne: hand,
      winner: ""
    });
  };

//render index
render() {
    const { playerOne, playerTwo, winner } = this.state;
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Rock Paper Scissors</h1>
        <h1 style={{ textAlign: "center" }}>Score Three to Win !!</h1>

        <div>
          <Player hand={playerOne} />
          <Player hand={playerTwo} />
        </div>
        <div>
          <button class="handBtn" onClick={() => this.selectWeapon("rock")}>rock</button>
          <button class="handBtn" onClick={() => this.selectWeapon("paper")}>paper</button>
          <button class="handBtn" onClick={() => this.selectWeapon("scissors")}>scissor</button>
        </div>
        <div class="winner">{winner ? this.winTotal() : null}</div>
        <div align="center"><button class="handBtn" type="button" onClick={this.startGame}>
          Start!
        </button></div>

        <div class="scoreboard">
        <Alert color="primary">
        <h3 id="WinTotal">Player One Total Score : 0</h3>
        </Alert>

        <Alert color="danger">
        <h3 id="2WinTotal">Player Two Total Score : 0</h3>
        </Alert>
        </div>

      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

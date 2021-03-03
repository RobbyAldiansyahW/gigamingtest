import React from "react";
import scissors from "./assets/scissors.png";
import paper from "./assets/paper.png";
import rock from "./assets/rock.png";

const Player = ({ hand }) => (
  <>
    <div className="player">
      <img
        className="player-image"
        src={
          hand === "rock" ? rock : hand === "scissors" ? scissors : paper
        }
        alt="Rock Paper Scissors"
      />
    </div>
  </>
);

export default Player;

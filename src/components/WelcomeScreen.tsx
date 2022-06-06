import React from "react";
import { useStore } from "../store";

const colors = ["yellow", "blue", "red", "pink"];

export default function WelcomeScreen() {
  const {
    playerName,
    updatePlayerName,
    playerColor,
    updatePlayerColor,
    updateEnterStatus,
  } = useStore((state) => {
    return {
      playerName: state.playerName,
      updatePlayerName: state.updatePlayerName,
      playerColor: state.playerColor,
      updatePlayerColor: state.updatePlayerColor,
      updateEnterStatus: state.updateEnterStatus,
    };
  });

  function enterClickHandler() {
    if (playerName !== "" || playerColor !== "") {
      updateEnterStatus(true);
    } else {
      alert("Enter all details");
    }
  }

  return (
    <div className="welcome-container">
      <h1>Welcome to cubeverse</h1>
      <p className="input-labels">Enter Name</p>
      <input
        type="text"
        value={playerName}
        onChange={(e) => updatePlayerName(e.target.value)}
      />
      <p className="input-labels">Select Color</p>
      <div className="color-pallete">
        {colors.map((color, index) => (
          <span
            key={index}
            onClick={() => updatePlayerColor(color)}
            className={`color-pill ${
              playerColor === color ? color + " active" : color
            }`}
          ></span>
        ))}
      </div>
      <button className="enter-button" onClick={enterClickHandler}>
        Enter
      </button>
    </div>
  );
}

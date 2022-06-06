import React from "react";
import { useStore } from "../store";

const { updateMovement } = useStore.getState();

export type Keys = {
  KeyW: string;
  KeyS: string;
  KeyA: string;
  KeyD: string;
  ArrowUp: string;
  ArrowDown: string;
  ArrowLeft: string;
  ArrowRight: string;
};

const keyCodeMapping: Keys = {
  KeyW: "forward",
  KeyS: "backward",
  KeyA: "left",
  KeyD: "right",
  ArrowUp: "forward",
  ArrowDown: "backward",
  ArrowLeft: "left",
  ArrowRight: "right",
};

function moveFieldByKey(key: keyof Keys): string {
  return keyCodeMapping[key];
}

function handleKeyDown(keyCode: string) {
  if (
    keyCode === "KeyW" ||
    keyCode === "KeyA" ||
    keyCode === "KeyS" ||
    keyCode === "KeyD" ||
    keyCode === "ArrowUp" ||
    keyCode === "ArrowDown" ||
    keyCode === "ArrowLeft" ||
    keyCode === "ArrowRight"
  ) {
    updateMovement({ [moveFieldByKey(keyCode)]: true });
  }
}

function handleKeyUp(keyCode: string) {
  if (
    keyCode === "KeyW" ||
    keyCode === "KeyA" ||
    keyCode === "KeyS" ||
    keyCode === "KeyD" ||
    keyCode === "ArrowUp" ||
    keyCode === "ArrowDown" ||
    keyCode === "ArrowLeft" ||
    keyCode === "ArrowRight"
  ) {
    updateMovement({ [moveFieldByKey(keyCode)]: false });
  }
}

function registerKeyEvents() {
  document.addEventListener("keydown", (e) => handleKeyDown(e.code));
  document.addEventListener("keyup", (e) => handleKeyUp(e.code));

  return () => {
    document.removeEventListener("keydown", (e) => handleKeyDown(e.code));
    document.removeEventListener("keyup", (e) => handleKeyUp(e.code));
  };
}

function movePlayer(player, movement) {
  const { forward, backward, left, right } = movement;
  if (forward) {
    player.current.position.z -= 0.05;
  }
  if (backward) {
    player.current.position.z += 0.05;
  }
  if (right) {
    player.current.position.x += 0.05;
  }
  if (left) {
    player.current.position.x -= 0.05;
  }
}

function Keyboard() {
  registerKeyEvents();
  return <React.Fragment></React.Fragment>;
}

export { movePlayer, Keyboard };

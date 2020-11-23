import { createParameter } from "typescript";
import { Game } from "./types";

export function compute(game: Game): number {
  let score = 0;  // Initializing the score
  try {
    // Loop through frames
    for (let frame = 0; frame < game.length; frame++) {
      const turn = game[frame];
      if(checkStrike(turn[0])) { // Checking for strike
          score += strike(game, frame);
      } else if(checkSpare(turn)) { // Checking for spare
          score += spare(game, frame);
      } else {
          score += sum(turn);
      }
    }
    return score;
  } catch(e) {
    console.log(e) // Throw error if something goes wrong
    return e;
  }
}

// Checks if the player has thrown a strike
const checkStrike = (n) => {
  if(Number(n) === 10) return true;
  else return false;
};

// Checks if the player has thrown a spare
const checkSpare = (arr) => {
  if(arr[0] + arr[1] === 10) return true;
  else return false;
}

// Calculates points if player threw a strike
const strike = (game, frame) => {
  const currentNumber = game[frame][0];

  // Checks if it was the last frame
  if(frame === 9) {
    return sum(game[frame]);
  } else if (frame === 8) {
    return currentNumber + game[frame+1][0] + game[frame+1][1];
  } else {
    if(checkStrike(game[frame+1][0])) {
      return currentNumber + game[frame+1][0] + game[frame+2][0];
    } else {
      return game[frame][0] + sum(game[frame+1]);
    }
  }
}

// Calculates points if player threw spare
const spare = (game, frame) => {
  const currentTurn = game[frame][0] + game[frame][1];
  if(frame === 9) {
    return currentTurn + game[frame][2];
  } else if(checkStrike( game[frame+1][0])) {
    return currentTurn + strike(game, frame+1);
  } else {
    return currentTurn +  game[frame+1][0]; 
  }
};

// Calculates the sum of all items in array
const sum = (arr) => {
  return arr.reduce((a,b) => a + b, 0);
}
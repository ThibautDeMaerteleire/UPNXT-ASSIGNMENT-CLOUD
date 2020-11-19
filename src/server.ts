import http from "http";
import express from "express";
import { v4 } from 'uuid';

import { compute } from "./compute";
import { Game } from './types';
import { DBActions } from './dbActions';

const app = express();
const dbActions = new DBActions();

app.use(express.json());

app.post("/compute", async (req, res) => {
  const game: Game = req.body.game; // Validate game as Game
  if(!game) throw new Error('Not game type.');  // Check if game isn't empty

  // Creating scoreObject
  const scoreObj = {
    id: v4(),
    score: compute(game)
  };

  await dbActions.addScore(scoreObj); // Add scoreObject to DB

  res.status(200).send({score: scoreObj.score});  // Send response
});

app.get("/history", async (req, res) => {
  if(!!<String>req.query.game) res.status(200).send(await dbActions.getScore(<String>req.query.game));  // if game is true send score
  else res.status(404).send("No id.");  // Send message + 404 status
});

app.get("/highscores", async (req, res) => {
  res.status(200).send(await dbActions.getAllScores()); // Send all scores
});

export const createServer = () => http.createServer(app);
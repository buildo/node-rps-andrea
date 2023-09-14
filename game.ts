import * as readline from "node:readline/promises";
import { match, P } from "ts-pattern";
import { read, Move } from "./model/move";
import { lastGame, allGames } from "./sql/db";
import { Result, resultArray, results } from "./model/result";

export function generateComputerMove() {
  return read(String(Math.round(Math.random() * 2)));
}
export function playLogic(userMove: Move, computerMove: Move) {
  return match([userMove, computerMove])
    .with(
      ["Rock", "Scissors"],
      ["Scissors", "Paper"],
      ["Paper", "Rock"],
      () => "You Win!!!"
    )
    .with(
      P.when(() => userMove === computerMove),
      () => "It's a Draw!"
    )
    .otherwise(() => "You lose :< ");
}

export async function welcome(): Promise<String[]> {
  const res = ["Wanna play? Your move (0: Rock, 1: Paper, 2: Scissors)"];

  const lastG = results.safeParse(await lastGame());
  if (lastG.success) {
    res.push("Our last game timestamp is : " + lastG.data.log_game + "\n");
    res.push(
      "and the game finished with this result : " + lastG.data.result + "\n"
    );
    return res;
  } else {
    res.push("Welcome to the best RPS game ever! \n");
    return res;
  }
}

export async function allGamesParsed(): Promise<Result[]> {
  const all = resultArray.safeParse(await allGames());
  if (all.success) {
    return all.data;
  } else {
    return [];
  }
}

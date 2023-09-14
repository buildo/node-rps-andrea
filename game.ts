import { match, P } from "ts-pattern";
import { read, Move } from "./model/move";
import { lastGame, allGames } from "./sql/db";
import { Result, resultArray, results } from "./model/result";
import { logRes } from "./sql/db";

export function generateComputerMove(): Move {
  return read(String(Math.round(Math.random() * 2)));
}
export function playLogic(userMove: Move, computerMove: Move): string {
  return match([userMove, computerMove])
    .with(
      ["Rock", "Scissors"],
      ["Scissors", "Paper"],
      ["Paper", "Rock"],
      () => {
        logRes("WIN");
        return "You Win!!!";
      }
    )
    .with(
      P.when(() => userMove === computerMove),
      () => {
        logRes("DRAW");
        return "It's a Draw!";
      }
    )
    .otherwise(() => {
      logRes("LOSE");
      return "You lose :< ";
    });
}

export async function welcome(): Promise<string[]> {
  const res = ["Wanna play? Your move (0: Rock, 1: Paper, 2: Scissors)"];
  const lastGameParsed = results.safeParse(await lastGame());
  if (lastGameParsed.success) {
    res.push(
      "Our last game timestamp is : " + lastGameParsed.data.game_date + "\n"
    );
    res.push(
      "and the game finished with this result : " +
        lastGameParsed.data.result +
        "\n"
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

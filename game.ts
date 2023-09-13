import * as readline from "node:readline/promises";
import { match, P } from "ts-pattern";
import { read, Move } from "./model/move";
import { lastGame, logRes } from "./sql/db";
import { results } from "./model/result";

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

export async function play(
  input: NodeJS.ReadableStream,
  output: NodeJS.WritableStream
) {
  const rl = readline.createInterface({ input, output });
  const computerMove = generateComputerMove();
  const lastG = results.safeParse(await lastGame());
  if (lastG.success) {
    rl.write("Our last game timestamp is : " + lastG.data.log_game + "\n");
    rl.write(
      "and the game finished with this result : " + lastG.data.result + "\n"
    );
  } else {
    rl.write("Welcome to the best RPS game ever! \n");
  }

  const userMove = read(
    await rl.question(
      "Wanna play? Your move (0: Rock, 1: Paper, 2: Scissors) \n"
    )
  );

  const res = playLogic(userMove, computerMove);
  logRes(res);

  output.write(`You chose:  ${userMove}\nComputer chose:  ${computerMove}\n`);
  output.write("The result is... " + res + " !\n");

  rl.close();
}

import * as readline from "node:readline/promises";
import { match, P } from "ts-pattern";
import { read, MoveEnum, Moves } from "./model/move";
import { ResultEnum, Result } from "./model/result";

export function generateComputerMove() {
  return read(String(Math.round(Math.random() * 2)));
}

export function playLogic(userMove: MoveEnum, computerMove: MoveEnum) {
  return match([userMove, computerMove])
    .returnType<ResultEnum>()
    .with(
      [Moves.Rock, Moves.Scissors],
      [Moves.Scissors, Moves.Paper],
      [Moves.Paper, Moves.Rock],
      () => Result.WIN
    )
    .with(
      P.when(() => userMove === computerMove),
      () => Result.DRAW
    )
    .otherwise(() => Result.LOSE);
}

export async function play(
  input: NodeJS.ReadableStream,
  output: NodeJS.WritableStream
) {
  const rl = readline.createInterface({ input, output });
  const computerMove = generateComputerMove();
  const userMove = read(
    await rl.question(
      "Wanna play? Your move (0: Rock, 1: Paper, 2: Scissors) \n"
    )
  );

  output.write(`You chose:  ${userMove}\nComputer chosed:  ${computerMove}\n`);
  output.write(
    "The result is... " + playLogic(userMove, computerMove) + " !\n"
  );

  rl.close();
}

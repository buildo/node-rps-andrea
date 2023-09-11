import * as readline from "node:readline/promises";
import { stdin as input, stdout as output, stdout } from "node:process";
import { match, P } from "ts-pattern";
import { read } from "./model/Move";

const rl = readline.createInterface({ input, output });

function generateComputerMove() {
  return read(String(Math.round(Math.random() * 2)));
}

export async function play(question: string) {
  const computerMove = generateComputerMove();
  const userMove = read(await rl.question(question));

  stdout.write(`You chose:  ${userMove}\nComputer chosed:  ${computerMove}\n`);

  match([userMove, computerMove])
    .with(["Rock", "Scissors"], ["Scissors", "Paper"], ["Paper", "Rock"], () =>
      stdout.write(`You win!\n`)
    )

    .with(
      P.when(() => userMove === computerMove),
      () => stdout.write(`Draw!\n`)
    )
    .otherwise(() => stdout.write(`You lose :<\n`));

  rl.close();
}

import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

//createInterface is a callable of Node's readLine module (see documentation)
//In this way, we can connect stdin and stdout
const rl = readline.createInterface({ input, output });

function generateComputerMove() {
  return String(Math.round(Math.random() * 2));
}

export function play(question: string) {
  let computerMove = generateComputerMove();
  rl.question(question, (userMove) => {
    rl.write(`You choosed:  ${userMove}\nComputer choosed:  ${computerMove}\n`);
    if (userMove == computerMove) {
      rl.write(`Draw!\n`);
    } else if (
      (userMove === "0" && computerMove === "2") ||
      (userMove === "2" && computerMove === "1") ||
      (userMove === "1" && computerMove === "0")
    ) {
      rl.write(`You win!\n`);
    } else {
      rl.write(`You lose :<\n`);
    } 
    rl.close();
  });
}

import { match, P } from "ts-pattern";
import { z } from "zod";

export enum Moves {
  Rock = "Rock",
  Paper = "Paper",
  Scissors = "Scissors",
}

const MoveEnum = z.nativeEnum(Moves);
export type MoveEnum = z.infer<typeof MoveEnum>;

export function read(input: string): MoveEnum {
  return match(input)
    .returnType<MoveEnum>()
    .with("0", () => MoveEnum.parse(Moves.Rock))
    .with("1", () => MoveEnum.parse(Moves.Paper))
    .with("2", () => MoveEnum.parse(Moves.Scissors))
    .otherwise(() => {
      throw new RangeError(
        "Sorry, you must enter a valid move (0, 1 or 2). Try again"
      );
    });
}

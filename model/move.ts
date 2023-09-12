import { match } from "ts-pattern";
import { z } from "zod";

const MoveNames = z.enum(["Rock", "Paper", "Scissors"]);
export type MoveN = z.infer<typeof MoveNames>;

export const MoveCodes = z.enum(["0", "1", "2"]).transform<MoveN>((val) =>
  match(val)
    .returnType<MoveN>()
    .with("0", () => "Rock")
    .with("1", () => "Paper")
    .with("2", () => "Scissors")
    .exhaustive()
);

export type MoveC = z.infer<typeof MoveCodes>;

export function read(input: string): MoveN {
  const res = MoveCodes.safeParse(input);
  if (res.success) {
    return res.data;
  } else {
    throw new RangeError(
      "Sorry, you must enter a valid move (0, 1 or 2). Try again"
    );
  }
}

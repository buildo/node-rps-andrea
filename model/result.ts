import { z } from "zod";

export enum Result {
  WIN = "You Win!!!",
  LOSE = "You lose :< ",
  DRAW = "It's a Draw!",
}

const ResultEnum = z.nativeEnum(Result);
export type ResultEnum = z.infer<typeof ResultEnum>;

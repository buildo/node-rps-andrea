import { z } from "zod";

export const results = z.object({
  game_date: z.coerce.date(),
  result: z.enum(["WIN", "LOSE", "DRAW"]),
});

export type Result = z.infer<typeof results>;
export const resultArray = z.array(results);
export type ResultArray = z.infer<typeof resultArray>;

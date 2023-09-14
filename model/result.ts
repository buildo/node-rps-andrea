import { date, z } from "zod";

export const results = z.object({
  log_game: z.ZodDate.create(),
  result: z.enum(["You Win!!!", "You lose :< ", "It's a Draw!"]),
});

export type Result = z.infer<typeof results>;

export const resultArray = z.array(results);
export type ResultArray = z.infer<typeof resultArray>;

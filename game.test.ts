import { expect, test } from "vitest";
import { playLogic } from "./game";
import { read } from "./model/move";

test("game logic test", () => {
  expect(playLogic("Rock", "Paper")).toBe("You lose :< ");
  expect(playLogic("Rock", "Scissors")).toBe("You Win!!!");
  expect(playLogic("Paper", "Rock")).toBe("You Win!!!");
  expect(playLogic("Paper", "Scissors")).toBe("You lose :< ");
  expect(playLogic("Scissors", "Rock")).toBe("You lose :< ");
  expect(playLogic("Scissors", "Paper")).toBe("You Win!!!");
});

test("read function test", () => {
  expect(read("0")).toBe("Rock");
  expect(read("1")).toBe("Paper");
  expect(read("2")).toBe("Scissors");

  const randomNum = String(Math.round(Math.random()) + 3);
  expect(() => read(randomNum)).toThrowError();
});

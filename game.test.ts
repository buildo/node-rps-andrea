import { expect, test, vi } from "vitest";
import { playLogic, welcome } from "./game";
import { read } from "./model/move";

vi.mock("./sql/db", () => {
  const logRes = vi.fn();
  logRes.mockResolvedValue("");
  const lastGame = vi.fn();
  lastGame.mockReturnValueOnce({
    game_date: "2023-09-14 10:08:15.151443",
    result: "blblbl",
  });
  lastGame.mockReturnValue({
    game_date: "2023-09-14 10:08:15.151443",
    result: "WIN",
  });

  return {
    logRes,
    lastGame,
  };
});

test("game logic test", () => {
  expect(playLogic("Rock", "Paper")).toBe("You lose :< ");
  expect(playLogic("Rock", "Scissors")).toBe("You Win!!!");
  expect(playLogic("Paper", "Rock")).toBe("You Win!!!");
  expect(playLogic("Paper", "Scissors")).toBe("You lose :< ");
  expect(playLogic("Scissors", "Rock")).toBe("You lose :< ");
  expect(playLogic("Scissors", "Paper")).toBe("You Win!!!");
});

test("welcome test", () => {
  welcome().then((arr) => expect(arr.length).toBe(2));
  welcome().then((arr) => expect(arr.length).toBe(3));
  welcome().then((arr) => expect(arr[2]).toContain("WIN"));
});

test("read function test", () => {
  expect(read("0")).toBe("Rock");
  expect(read("1")).toBe("Paper");
  expect(read("2")).toBe("Scissors");

  const randomNum = String(Math.round(Math.random()) + 3);
  expect(() => read(randomNum)).toThrowError();
});

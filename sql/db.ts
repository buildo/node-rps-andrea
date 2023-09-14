import pgPromise, { ParameterizedQuery as PQ } from "pg-promise";
import { Result } from "../model/result";

const cn = {
  host: "localhost",
  port: 5438,
  database: "root",
  user: "root",
  password: "root",
  max: 30, // use up to 30 connections
};

const pgp = pgPromise();
const db = pgp(cn);

export async function lastGame(): Promise<Result> {
  return await db.one<Result>(
    "SELECT log_game, result FROM results ORDER BY log_game DESC LIMIT 1"
  );
}

export async function logRes(res: String) {
  const addResult = new PQ("INSERT into results(result) VALUES($1)");
  return await db.none(addResult, [res]);
}

export async function allGames() {
  return await db.any("SELECT log_game, result FROM results ORDER BY log_game");
}

export function closeDB() {
  db.$pool.end();
}

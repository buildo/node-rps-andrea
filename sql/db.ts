import pgPromise, {
  ParameterizedQuery as PQ,
  PreparedStatement as PS,
} from "pg-promise";
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
export const db = pgp(cn);

export async function lastGame() {
  return await db.one<Result>(
    "SELECT log_game, result FROM results ORDER BY log_game DESC LIMIT 1"
  );
}

export async function logRes(res: String) {
  const addResult = new PQ("INSERT into results(result) VALUES($1)");
  return await db.none(addResult, [res]);
}

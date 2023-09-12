import pgPromise, { IDatabase } from "pg-promise";
import { match, P } from "ts-pattern";

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

/*
export async function isEmpty() {
  const gamelist = await db.any("SELECT * FROM Results", [true]);
  match(gamelist).with;
}
*/

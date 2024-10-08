import { RequestHandler } from "express";
import * as db from "../db/index";
import { QueryResult } from "pg";

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    //   Make a db query
    const result: QueryResult | void = await db.query("SELECT * FROM users");
    //   Check if query returned data that is not empty array
    if (result && result.rowCount && result.rowCount > 0) {
      res.status(200).json({
        msg: "Getting all users",
        result: result.rows,
      });
      // If not return simple error message
    } else {
      res.status(404).json({
        msg: "No users found in the database",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { getAllUsers };

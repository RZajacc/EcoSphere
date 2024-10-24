import { RequestHandler } from "express";
import * as db from "../db/index";
import { QueryResult } from "pg";

export const getAllEvents: RequestHandler = async (req, res) => {
  try {
    //   Make a db query
    const result: QueryResult | void = await db.query(
      "SELECT * FROM events ORDER BY date"
    );
    //   Check if query returned data that is not empty array
    if (result && result.rowCount && result.rowCount > 0) {
      res.status(200).json({
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

export const getAllEventsByDate: RequestHandler = async (req, res) => {
  // Getting inputs from the request
  const inputs: { date: string } = req.body;

  try {
    // DB Query
    const result: QueryResult | void = await db.query(
      `SELECT * FROM events WHERE date >='${inputs.date}' ORDER BY date`
    );
    if (result && result.rowCount && result.rowCount > 0) {
      res.status(200).json({
        result: result.rows,
      });
    } else {
      res.status(404).json({
        msg: "No entries foun",
      });
    }
  } catch (error) {
    res.status(500).json("ERROR occured");
  }
};

export default { getAllEvents, getAllEventsByDate };

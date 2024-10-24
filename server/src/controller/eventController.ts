import { RequestHandler } from "express";
import * as db from "../db/index";
import { QueryResult } from "pg";

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

export const getEventByTitle: RequestHandler = async (req, res) => {
  const inputs: { title: string } = req.body;
  try {
    const result: QueryResult | void = await db.query(`
      SELECT 
	      u.user_name,
	      e.title,
	      e.description,
        e.date,
        e.adress,
        e.imageurl
      FROM events e
      JOIN users u ON u.user_id = e.user_id 
      WHERE title = '${inputs.title}'`);

    if (result && result.rowCount && result.rowCount > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({
        msg: "Could not find entry with provided title",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { getAllEventsByDate, getEventByTitle };

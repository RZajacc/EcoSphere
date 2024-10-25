import { RequestHandler } from "express";
import bcrypt, { hash } from "bcrypt";
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

export const signup: RequestHandler = async (req, res) => {
  const inputs: { userName: string; email: string; password: string } =
    req.body;

  // Bcrypt config
  const saltRounds = 10;

  // Hash password and store new user in database
  bcrypt.hash(inputs.password, saltRounds, async (err, hash) => {
    // If hashing fails return an error
    if (err) {
      res.status(500).json({
        msg: "Error while hashing the password",
      });
    }

    // If theres no error, store new user in the database
    try {
      const result: QueryResult | void = await db.query(
        `INSERT INTO users (user_name, email, password) VALUES ('${inputs.userName}', '${inputs.email}', '${hash}')`
      );
      // If query was successfull return a message
      if (result) {
        res.status(200).json({
          msg: "New user added to the database",
        });
      } else {
        res.status(404).json({
          msg: "Something went wront while adding a user",
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Something went wrong while saving a user in the database",
      });
    }
  });
};

export const login: RequestHandler = async (req, res) => {
  const inputs: { email: string; password: string } = req.body;

  const result = await db.query(
    `SELECT * FROM users WHERE email = '${inputs.email}'`
  );

  if (result) {
    bcrypt.compare(inputs.password, result.rows[0].password, (err, result) => {
      console.log("PASSWORD COMPARE", result);
    });
  }
};

export default { getAllUsers, signup, login };

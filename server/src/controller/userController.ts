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

  bcrypt.hash(inputs.password, saltRounds, (err, hash) => {
    // If hashing fails return an error
    if (err) {
      res.status(500).json({
        msg: "Error while hashing the password",
      });
    }

    // If theres no error store new user in the database
    try {
    } catch (error) {
      res.status(500).json({
        msg: "Something went wrong while saving a user in the database",
      });
    }

    res.status(200).json({
      password: inputs.password,
      hashedPassword: hash,
    });
  });
};

export default { getAllUsers, signup };

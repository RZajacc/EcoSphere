import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import * as db from "../db/index";
import { QueryResult } from "pg";
import jwt from "jsonwebtoken";

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    //   Make a db query
    const result: QueryResult | void = await db.query("SELECT * FROM users");
    //   Check if query returned data that is not empty array
    if (result && result.rowCount != 0) {
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

  // Check if the user already exists
  try {
    const result: QueryResult | void = await db.query(
      `SELECT * FROM users WHERE email='${inputs.email}'`
    );
    // If the user exists return an error
    if (result && result.rowCount !== 0) {
      res.status(400).json({
        msg: "User with provided email already exists!",
        count: result.rowCount,
        rows: result.rows,
      });
      // If the user doesnt exist create a new one and hash the password
    } else {
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
          if (result && result.rowCount != 0) {
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
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login: RequestHandler = async (req, res) => {
  const inputs: { email: string; password: string } = req.body;

  // Check if the user exists in the database
  try {
    const queryResult = await db.query(
      `SELECT * FROM users WHERE email = '${inputs.email}'`
    );

    if (queryResult && queryResult.rowCount === 0) {
      res.status(404).json({
        msg: "User was not found in the database",
      });
    }

    if (queryResult && queryResult.rowCount !== 0) {
      // If user exists check if provided password is valid
      bcrypt.compare(
        inputs.password,
        queryResult.rows[0].password,
        (err, result) => {
          // If theres an error while comparing passwords return it
          if (err) {
            res.status(400).json(err);
          }

          // Else sign a jwt token and return it
          if (result) {
            let token = jwt.sign(
              {
                sub: queryResult.rows[0].user_id,
                email: queryResult.rows[0].email,
              },
              "temporary secret key",
              {
                expiresIn: "1d",
              }
            );
            res.status(200).json({ token });
          } else {
            res.status(401).json({ msg: "Password is incorrect!" });
          }
        }
      );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { getAllUsers, signup, login };

import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import * as db from "../db/index";
import { QueryResult } from "pg";
import jwt from "jsonwebtoken";
import { User } from "../types/UserTypes";
import {
  updateImageOwner,
  updateUserImg,
  uploadImage,
} from "../services/imageService";

const signup: RequestHandler = async (req, res) => {
  const inputs: { userName: string; email: string; password: string } =
    req.body;

  // Check if the user already exists
  try {
    const result: void | QueryResult<{ email: string }> = await db.query(
      `SELECT email FROM users WHERE email='${inputs.email}'`
    );
    // If the user exists return an error
    if (result && result.rowCount !== 0) {
      res.status(400).json({
        msg: "User with provided email already exists!",
        emailProvided: result.rows[0].email,
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
          if (result && result.rowCount !== 0) {
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

const login: RequestHandler = async (req, res) => {
  const inputs: { email: string; password: string } = req.body;

  // Check if the user exists in the database
  try {
    const queryResult: void | QueryResult<User> = await db.query(
      `SELECT * FROM users WHERE email = '${inputs.email}'`
    );

    if (queryResult && queryResult.rowCount === 0) {
      res.status(404).json({
        msg: "User was not found in the database",
      });
    }

    if (queryResult && queryResult.rowCount !== 0) {
      // Secret key to encrypt jwt token
      const secretKey = process.env.MYSECRETKEY as string;
      // If user exists check if provided password is valid
      bcrypt.compare(
        inputs.password,
        queryResult.rows[0].password,
        (err, result) => {
          // If theres an error while comparing passwords return it
          if (err) {
            res.status(400).json(err);
          }
          console.log("PASSWORD MATCH", result);
          // If passwords match sign the token, otherwise send a message to the user
          if (result) {
            let token = jwt.sign(
              {
                sub: queryResult.rows[0].user_id,
                email: queryResult.rows[0].email,
              },
              secretKey,
              {
                expiresIn: "1d",
              }
            );
            // res.status(200).json({ token });
            res.cookie("auth-token", token, {
              httpOnly: true,
              sameSite: "strict",
              path: "/",
              // secure:true
            });
            res.status(201).json({
              msg: "Login successfull",
              token: token,
            });
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

const getUser: RequestHandler = (req, res) => {
  // Get user from the request
  const user = req.user;

  // If it exists return it, otherwise send a message
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({
      msg: "You need to authorize first!",
    });
  }
};

const updateImage: RequestHandler = async (req, res) => {
  // Prepare inputs and check if user is present
  const inputs: { folder?: string } = req.body;
  const user = req.user;
  const file = req.file;

  // Return an error if user is not authorized
  if (!user) {
    res.status(401).json({ err: "You are not authorized to do that!" });
  }

  // If file is not available return an error
  if (!file) {
    res.status(404).json({ err: "No file provided!" });
  } else {
    // Proceed with updating user image
    try {
      // Upload an image
      const imageId = await uploadImage(file!, inputs.folder);
      // Update image's owner (event or user)
      if (imageId) {
        // Update image owner id
        await updateImageOwner(imageId, user?.user_id);

        // If image was uploaded
        await updateUserImg(imageId, user!.user_id);

        // If no error was thrown then return a message
        res.status(200).json({ msg: "Update successfull!" });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ msg: error.message });
      } else {
        res.status(500).json({ msg: "Unexpected error!" });
      }
    }
  }
};

export { signup, login, getUser, updateImage };

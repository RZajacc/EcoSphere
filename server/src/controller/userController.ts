import { RequestHandler } from "express";

export const getAllUsers: RequestHandler = (req, res) => {
  res.status(200).json({
    msg: "Getting all users",
  });
};

export default { getAllUsers };

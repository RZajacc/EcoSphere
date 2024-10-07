"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const getAllUsers = (req, res) => {
    res.status(200).json({
        msg: "Getting all users",
    });
};
exports.getAllUsers = getAllUsers;
exports.default = { getAllUsers: exports.getAllUsers };

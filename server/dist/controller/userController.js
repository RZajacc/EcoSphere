"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.login = exports.signup = exports.getAllUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db = __importStar(require("../db/index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   Make a db query
        const result = yield db.query("SELECT * FROM users");
        //   Check if query returned data that is not empty array
        if (result && result.rowCount != 0) {
            res.status(200).json({
                msg: "Getting all users",
                result: result.rows,
            });
            // If not return simple error message
        }
        else {
            res.status(404).json({
                msg: "No users found in the database",
            });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllUsers = getAllUsers;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = req.body;
    // Check if the user already exists
    try {
        const result = yield db.query(`SELECT * FROM users WHERE email='${inputs.email}'`);
        // If the user exists return an error
        if (result && result.rowCount !== 0) {
            res.status(400).json({
                msg: "User with provided email already exists!",
                count: result.rowCount,
                rows: result.rows,
            });
            // If the user doesnt exist create a new one and hash the password
        }
        else {
            // Bcrypt config
            const saltRounds = 10;
            // Hash password and store new user in database
            bcrypt_1.default.hash(inputs.password, saltRounds, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
                // If hashing fails return an error
                if (err) {
                    res.status(500).json({
                        msg: "Error while hashing the password",
                    });
                }
                // If theres no error, store new user in the database
                try {
                    const result = yield db.query(`INSERT INTO users (user_name, email, password) VALUES ('${inputs.userName}', '${inputs.email}', '${hash}')`);
                    // If query was successfull return a message
                    if (result && result.rowCount != 0) {
                        res.status(200).json({
                            msg: "New user added to the database",
                        });
                    }
                    else {
                        res.status(404).json({
                            msg: "Something went wront while adding a user",
                        });
                    }
                }
                catch (error) {
                    res.status(500).json({
                        msg: "Something went wrong while saving a user in the database",
                    });
                }
            }));
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = req.body;
    // Check if the user exists in the database
    try {
        const queryResult = yield db.query(`SELECT * FROM users WHERE email = '${inputs.email}'`);
        if (queryResult && queryResult.rowCount === 0) {
            res.status(404).json({
                msg: "User was not found in the database",
            });
        }
        if (queryResult && queryResult.rowCount !== 0) {
            // Secret key to encrypt jwt token
            const secretKey = process.env.MYSECRETKEY;
            // If user exists check if provided password is valid
            bcrypt_1.default.compare(inputs.password, queryResult.rows[0].password, (err, result) => {
                // If theres an error while comparing passwords return it
                if (err) {
                    res.status(400).json(err);
                }
                // If passwords match sign the token, otherwise send a message to the user
                if (result) {
                    let token = jsonwebtoken_1.default.sign({
                        sub: queryResult.rows[0].user_id,
                        email: queryResult.rows[0].email,
                    }, secretKey, {
                        expiresIn: "1d",
                    });
                    res.status(200).json({ token });
                }
                else {
                    res.status(401).json({ msg: "Password is incorrect!" });
                }
            });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.login = login;
const getUser = (req, res) => {
    const user = req.user;
    res.status(200).json({
        msg: "Hey",
        user: user,
    });
};
exports.getUser = getUser;
exports.default = { getAllUsers: exports.getAllUsers, signup: exports.signup, login: exports.login, getUser: exports.getUser };

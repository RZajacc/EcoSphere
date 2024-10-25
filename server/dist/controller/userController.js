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
exports.signup = exports.getAllUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db = __importStar(require("../db/index"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   Make a db query
        const result = yield db.query("SELECT * FROM users");
        //   Check if query returned data that is not empty array
        if (result && result.rowCount && result.rowCount > 0) {
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
    // Bcrypt config
    const saltRounds = 10;
    bcrypt_1.default.hash(inputs.password, saltRounds, (err, hash) => {
        // If hashing fails return an error
        if (err) {
            res.status(500).json({
                msg: "Error while hashing the password",
            });
        }
        // If theres no error store new user in the database
        try {
        }
        catch (error) {
            res.status(500).json({
                msg: "Something went wrong while saving a user in the database",
            });
        }
        res.status(200).json({
            password: inputs.password,
            hashedPassword: hash,
        });
    });
});
exports.signup = signup;
exports.default = { getAllUsers: exports.getAllUsers, signup: exports.signup };

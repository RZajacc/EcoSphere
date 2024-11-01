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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventByTitle = exports.getAllEventsByDate = void 0;
const db = __importStar(require("../db/index"));
const getAllEventsByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Getting inputs from the request
    const inputs = req.body;
    try {
        // DB Query
        const result = yield db.query(`SELECT * FROM events WHERE date >='${inputs.date}' ORDER BY date`);
        if (result && result.rowCount !== 0) {
            res.status(200).json({
                result: result.rows,
            });
        }
        else {
            res.status(404).json({
                msg: "No entries found",
            });
        }
    }
    catch (error) {
        res.status(500).json("ERROR occured");
    }
});
exports.getAllEventsByDate = getAllEventsByDate;
const getEventByTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = req.body;
    try {
        const result = yield db.query(`
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
        if (result && result.rowCount !== 0) {
            res.status(200).json(result.rows[0]);
        }
        else {
            res.status(404).json({
                msg: "Could not find entry with provided title",
            });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getEventByTitle = getEventByTitle;
exports.default = { getAllEventsByDate: exports.getAllEventsByDate, getEventByTitle: exports.getEventByTitle };

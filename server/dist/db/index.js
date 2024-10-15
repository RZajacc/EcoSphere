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
exports.query = void 0;
const pg_1 = __importDefault(require("pg"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const { Pool } = pg_1.default;
const pool = new Pool();
// Create tables
const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
    const queryText = `
    CREATE TABLE IF NOT EXISTS users( 
      user_id INT GENERATED ALWAYS AS IDENTITY,
      user_name VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL,
      PRIMARY KEY(user_id)
    );
     CREATE TABLE IF NOT EXISTS events (
	    event_id INT GENERATED ALWAYS AS IDENTITY,
	    title VARCHAR(100) NOT NULL,
	    user_id INT,
	    description TEXT NOT NULL,
	    date TIMESTAMPTZ NOT NULL,
	    adress VARCHAR(255) NOT NULL,
		  imageurl TEXT NOT NULL,
	    PRIMARY KEY(event_id),
	    CONSTRAINT fk_user
		    FOREIGN KEY (user_id)
			    REFERENCES users (user_id)
    );
    CREATE TABLE IF NOT EXISTS users_events (
	    user_id INT REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE CASCADE,
	    event_id INT REFERENCES events (event_id) ON UPDATE CASCADE ON DELETE CASCADE,
	    CONSTRAINT user_events_pk
		    PRIMARY KEY (user_id, event_id)	
    );
  `;
    // Timing function for feedback
    const start = Date.now();
    const result = yield pool.query(queryText);
    const duration = Date.now() - start;
    // If result returned something print feedback to the console
    if (result) {
        console.log("Successfully executed provided query in", duration, "ms");
    }
    else {
        console.log("Something went wrong while building tables");
    }
});
createTables();
// Export query function for controller methods
const query = (text, params, callback) => {
    // Both params and callback provided
    if (params && callback) {
        return pool.query(text, params, callback);
    }
    // Params but no callback provided
    if (params && !callback) {
        return pool.query(text, params);
    }
    // Just query text provided
    return pool.query(text);
};
exports.query = query;

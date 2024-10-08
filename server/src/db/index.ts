import pg, { QueryResult } from "pg";
import * as dotenv from "dotenv";
dotenv.config();
const { Pool } = pg;

const pool = new Pool();

// Create tables
const createTables = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users( 
      user_id INT GENERATED ALWAYS AS IDENTITY,
      user_name VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL,
      PRIMARY KEY(user_id)
    );
    CREATE TABLE IF NOT EXISTS events (
	    event_id INT GENERATED ALWAYS AS IDENTITY,
	    user_id INT,
	    title VARCHAR(100) NOT NULL,
	    description TEXT NOT NULL,
	    PRIMARY KEY(event_id)
    );
  `;
  // Timing function for feedback
  const start = Date.now();
  const result: QueryResult = await pool.query(queryText);
  const duration = Date.now() - start;
  // If result returned something print feedback to the console
  if (result) {
    console.log("Successfully executed provided query in", duration, "ms");
  } else {
    console.log("Something went wrong while building tables");
  }
};
createTables();

// Export query function for controller methods
export const query = (
  text: string,
  params?: string[],
  callback?: () => void
) => {
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
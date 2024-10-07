import pg from "pg";
import * as dotenv from "dotenv";
dotenv.config();
const { Pool } = pg;

const pool = new Pool();

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

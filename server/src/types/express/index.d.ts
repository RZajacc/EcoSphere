export {};

declare global {
  namespace Express {
    export interface User {
      user_id: number;
      user_name: string;
      email: string;
    }
  }
}

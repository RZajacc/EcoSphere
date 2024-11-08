export {};

declare global {
  namespace Express {
    export interface User {
      user_id: number;
      user_name: string;
      email: string;
      image: {
        public_url: string | null;
        width: number | null;
        height: number | null;
        type: string | null;
      };
    }
  }
}

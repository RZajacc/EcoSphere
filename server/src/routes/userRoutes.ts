import { Router } from "express";

const router = Router();

router.get("/getAllUsers", () => {
  console.log("Getting users");
});

export default router;

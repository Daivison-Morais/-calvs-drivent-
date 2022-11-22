import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { paymentByTicket, paymentProcess } from "@/controllers";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", paymentByTicket)
  .post("/process", paymentProcess);

export { paymentRouter };

import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { paymentByTicket, paymentProcess } from "@/controllers/payment-controller";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", paymentByTicket)
  .post("/process", paymentProcess);

export default paymentRouter;

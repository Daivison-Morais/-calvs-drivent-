import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { ticketType, returnTicket, insertTicket } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", ticketType)
  .get("/", returnTicket)
  .post("/", insertTicket);
export { ticketsRouter };

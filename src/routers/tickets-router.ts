import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { ticketType } from "@/controllers/tickets-controller";
/* 
import { } from "@/controllers";
import {  } from "@/schemas"; */

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", ticketType)
  .get("/")
  .post("/");
export { ticketsRouter };

import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import ticketService from "@/services/tickets-service";
async function ticketType(req: AuthenticatedRequest, res: Response) { 
  try {
    const typeTicket =  await ticketService.typeTicket();
    return res.status(httpStatus.OK).send(typeTicket);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export { ticketType };


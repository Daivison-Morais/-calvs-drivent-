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

async function returnTicket(req: AuthenticatedRequest, res: Response) {
  const userId  = req.userId;
  try {
    const ticket = await ticketService.findOneTicket(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.send(httpStatus.NOT_FOUND);
    }
    return res.send(httpStatus.BAD_REQUEST);
  }
}

async function insertTicket(req: AuthenticatedRequest, res: Response) {
  const ticketTypeId: number = req.body.ticketTypeId;
  const { userId } = req;
  try {
    const postedTicket = await ticketService.insertTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(postedTicket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(error.name === "RequestError") {
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
  }
}

export { ticketType, returnTicket, insertTicket };


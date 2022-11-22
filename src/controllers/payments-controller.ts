import { AuthenticatedRequest } from "@/middlewares";
import { postCardBody } from "@/protocols";
import paymentService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

async function paymentByTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketId = Number(req.query.ticketId);
  
  try {
    const ticketPaid = await paymentService.paymentByTicket(userId, ticketId);
    return res.status(httpStatus.OK).send(ticketPaid);
  } catch (error) {
    if(error.name === "RequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

async function paymentProcess(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const bodyCard = req.body as postCardBody;
  
  try {
    const ticketPaid = await paymentService.paymentProcess(userId, bodyCard);
    return res.status(httpStatus.OK).send(ticketPaid);
  } catch (error) {
    if(error.name === "RequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export { paymentByTicket, paymentProcess };

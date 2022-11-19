import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

async function payment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    res.send("okkkkk");
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export { payment };

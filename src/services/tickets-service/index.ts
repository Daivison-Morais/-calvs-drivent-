import { notFoundError } from "@/errors";
import { requestError } from "@/errors/request-error";
import ticketRepository from "@/repositories/ticket-repository";
import httpStatus from "http-status";

async function typeTicket() {
  const result = await ticketRepository.typeTicket();

  if (!result) throw notFoundError();
  return result;  
}

async function findOneTicket(userId: number) {
  const findEnrollment = await ticketRepository.findEnrollmentId(userId);
  if (!findEnrollment) throw notFoundError();

  const result = await ticketRepository.findOneTicket(userId);
  if (!result) throw notFoundError();
  return result;  
}

async function insertTicket(userId: number, ticketTypeId: number) {
  const existEnrollment = await ticketRepository.findEnrollmentId(userId);
  if (!existEnrollment) throw notFoundError();

  const existTicket = await ticketRepository.findTicketByUser(userId);
  if (!existTicket) throw requestError(httpStatus.BAD_REQUEST, "RequestError");

  const result = await ticketRepository.insertTicket(userId, ticketTypeId);
  return result;
}

const ticketService = { typeTicket, findOneTicket, insertTicket };
export default ticketService;


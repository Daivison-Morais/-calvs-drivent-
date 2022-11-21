import { notFoundError, requestError, unauthorizedError } from "@/errors";
import { postCardBody } from "@/protocols";
import paymentRepository from "@/repositories/payments-repository";
import { Payment } from "@prisma/client";
import httpStatus from "http-status";

async function paymentByTicket(userId: number, ticketId: number) {
  if(!ticketId) throw requestError(httpStatus.BAD_REQUEST, "RequestError");

  const existTicketId = await paymentRepository.findTicketId(ticketId);
  if(!existTicketId) throw notFoundError();

  const userContensTicket = await paymentRepository.userContensTicket( userId);
  if(!userContensTicket) throw unauthorizedError();

  const payment = await paymentRepository.findOnePaymentByTicketId(userId, ticketId);
  if (!payment) throw notFoundError();
  return payment;
}

async function paymentProcess(userId: number, bodyCard: postCardBody) {
  if (!bodyCard.ticketId) throw requestError(httpStatus.BAD_REQUEST, "RequestError");
  if (!bodyCard.cardData) throw requestError(httpStatus.BAD_REQUEST, "RequestError");

  const existTicketId = await paymentRepository.findTicketId(bodyCard.ticketId);
  if(!existTicketId) throw notFoundError();

  const userContensTicket = await paymentRepository.userContensTicket(userId);
  if(!userContensTicket) throw unauthorizedError();

  const newPayment: Omit<Payment, "id"> = {
    ticketId: bodyCard.ticketId,
    value: existTicketId.TicketType.price,
    cardIssuer: bodyCard.cardData.issuer,
    cardLastDigits: String(bodyCard.cardData.number).slice(-4),
    createdAt: new Date(),
    updatedAt: new Date ()
  };

  const paymentProcess = await paymentRepository.paymentProcess(bodyCard.ticketId, newPayment);
  
  return paymentProcess;
}
const paymentService = {
  paymentByTicket,
  paymentProcess
};
export default paymentService;

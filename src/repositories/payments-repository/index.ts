import { prisma } from "@/config";
import { Payment, TicketStatus } from "@prisma/client";

async function findTicketId(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId
    },
    include: { TicketType: true }
  });
}

async function userContensTicket(userId: number) {
  const enrollmentId = prisma.enrollment.findFirst({
    where: { userId, },
  });
  return prisma.ticket.findFirst({
    where: { enrollmentId: (await enrollmentId).id }
  });
}

async function findOnePaymentByTicketId(userId: number, ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId
    }
  });
}

async function paymentProcess(ticketId: number, newPayment: Omit<Payment, "id">) {
  await prisma.ticket.update({
    where: { 
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID
    }
  });
   
  return await prisma.payment.create({
    data: newPayment,
  });
}

const paymentRepository = {
  findOnePaymentByTicketId,
  findTicketId,
  userContensTicket,
  paymentProcess,
  
};
export default paymentRepository;

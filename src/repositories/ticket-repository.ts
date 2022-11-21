import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function typeTicket() {
  return prisma.ticketType.findMany();
}

async function findOneTicket(userId: number) {
  const enrollmentId = prisma.enrollment.findFirst({
    where: { userId, },
  });

  return prisma.ticket.findFirst({
    where: { enrollmentId: (await enrollmentId).id },
    include: { TicketType: true },
  });
}

async function insertTicket(userId: number, enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
      status: TicketStatus.RESERVED,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    include: { TicketType: true } 
  });
}

async function findEnrollmentId( userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function findTicketByUser(userId: number) {
  const id = await prisma.enrollment.findFirst({
    where: { userId, },
  });
  return prisma.ticket.findFirst({
    where: { enrollmentId: id.id },
  });
}

async function verifySession(userId: number) {
  return await prisma.enrollment.findFirst({
    where: {
      userId
    }
  });
}

const ticketRepository = {
  typeTicket,
  findOneTicket,
  insertTicket,
  findEnrollmentId,
  findTicketByUser,
  verifySession
};

export default ticketRepository;

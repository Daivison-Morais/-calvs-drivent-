import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";
import { postTicketBody } from "@/protocols";

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

async function insertTicket(userId: number, ticketTypeId: number) {
  const enrollment = prisma.enrollment.findFirst({
    where: { userId, },
  });
  const enrollmentId = prisma.ticket.findFirst({
    where: { enrollmentId: (await enrollment).id },
  });
  
  prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: (await enrollmentId).id,
      status: TicketStatus.RESERVED 
    } 
  });

  return prisma.ticket.findFirst({
    where: { enrollmentId: (await enrollmentId).id },
    include: { Enrollment: true, TicketType: true }
  });
}

async function findEnrollmentId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId, },
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

const ticketRepository = {
  typeTicket,
  findOneTicket,
  insertTicket,
  findEnrollmentId,
  findTicketByUser,
};

export default ticketRepository;

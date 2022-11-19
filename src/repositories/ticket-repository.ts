import { prisma } from "@/config";

async function typeTicket() {
  return prisma.ticketType.findMany();
}

const ticketRepository = {
  typeTicket
};

export default ticketRepository;

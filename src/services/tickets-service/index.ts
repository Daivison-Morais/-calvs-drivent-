import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";

async function typeTicket() {
  const result = await ticketRepository.typeTicket();

  if (!result) throw notFoundError();
  return result;  
}

const ticketService = { typeTicket };
export default ticketService;


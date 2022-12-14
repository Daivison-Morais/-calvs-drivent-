export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string

}

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type postTicketBody = {         
  ticketTypeId: number, 
  enrollmentId: number,
  status: string,
}

export type postCardBody = {
	ticketId: number,
	cardData: {
		issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
	}
}

export type paymentResponse = {
  id: number,
  ticketId: number,
  cardIssuer: string,
  cardLastDigits: string,
  value: number,
  createdAt: string | Date,
  updatedAt: string | Date
}

export type createPayment = {
  ticketId: number,
    value: number,
    cardIssuer: string,
    cardLastDigits: string
    createdAt: string | Date,
    updatedAt: string | Date
}

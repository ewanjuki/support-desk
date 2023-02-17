import axios from "axios";

const API_URL = "/api/tickets";

// Create ticket
const createTicket = async (token, ticket) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ticket, config);

  return response.data;
};

// Get user tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get user ticket
const getTicket = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `/${id}`, config);

  return response.data;
};

const ticketService = { createTicket, getTickets, getTicket };

export default ticketService;

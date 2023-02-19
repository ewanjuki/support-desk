import axios from "axios";

const API_URL = "/api/tickets";

// Get ticket notes
const getNotes = async (token, ticketId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `/${ticketId}/notes`, config);

  return response.data;
};

// Create ticket note
const createNote = async (token, ticketId, text) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + `/${ticketId}/notes`,
    { text },
    config
  );

  return response.data;
};

const noteService = { getNotes, createNote };
export default noteService;

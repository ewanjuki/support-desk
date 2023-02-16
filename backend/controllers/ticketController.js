const asyncHandler = require("express-async-handler");

const Ticket = require("../models/Ticket");
const User = require("../models/User");

// @desc   Get user tickets
// @route  GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get tickets" });
});

// @desc   Create new ticket
// @route  POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Create ticket" });
});

module.exports = { getTickets, createTicket };

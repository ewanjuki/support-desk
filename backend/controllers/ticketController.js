const asyncHandler = require("express-async-handler");

const Ticket = require("../models/Ticket");
const User = require("../models/User");

// @desc   Get user tickets
// @route  GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user using id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    req.status(401);
    throw new Error("Not authorized");
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc   Create new ticket
// @route  POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description");
  }

  // Get user using id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    req.status(401);
    throw new Error("Not authorized");
  }

  const ticket = await Ticket.create({
    user: req.user.id,
    product,
    description,
    status: "new",
  });

  res.status(201).json(ticket);
});

module.exports = { getTickets, createTicket };

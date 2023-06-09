import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";

import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";
import {
  getNotes,
  reset as notesReset,
  createNote,
} from "../features/notes/noteSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { ticketId } = params;

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [dispatch, ticketId, isError, message]);

  const ticketCloseHandler = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  const openModalHandler = () => setModalIsOpen(true);
  const closeModalHandler = () => setModalIsOpen(false);

  const noteSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createNote({ticketId, noteText}));
    setModalIsOpen(false);
  };

  if (isLoading || notesIsLoading) return <Spinner />;

  if (isError) return <h3>Something went wrong</h3>;

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== "closed" && (
        <button className="btn" onClick={openModalHandler}>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModalHandler}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModalHandler}>
          X
        </button>
        <form onSubmit={noteSubmitHandler}>
          <div className="form-group">
            <textarea
              className="form-control"
              id="noteText"
              name="noteText"
              placeholder="Note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== "closed" && (
        <button
          onClick={ticketCloseHandler}
          className="btn btn-block btn-danger"
        >
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;

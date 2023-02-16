import { useState } from "react";
import { useSelector } from "react-redux";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState("iPhone");
  const [description, setDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p> Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label>Customer Name</label>
          <input
            type="text"
            className="form-control"
            value={user.name}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Customer Email</label>
          <input
            type="email"
            className="form-control"
            value={user.email}
            disabled
          />
        </div>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;

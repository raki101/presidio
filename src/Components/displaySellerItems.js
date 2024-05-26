import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DisplaySellerItems = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formValues, setFormValues] = useState({
    place: "",
    area: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    navigate("/selleritems");
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive: false }),
    })
      .then((response) => {
        if (response.ok) {
          setItems((prevItems) => prevItems.filter((item) => item._id !== id));
        } else {
          console.error("Failed to delete item");
        }
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  const startEditing = (item) => {
    setEditingItem(item._id);
    setFormValues({
      place: item.place,
      area: item.area,
      description: item.description,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const updateItem = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/items/${editingItem}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => {
        if (response.ok) {
          setItems((prevItems) =>
            prevItems.map((item) =>
              item._id === editingItem ? { ...item, ...formValues } : item
            )
          );
          setEditingItem(null);
        } else {
          console.error("Failed to update item");
        }
      })
      .catch((error) => console.error("Error updating item:", error));
  };

  return (
    <div className="container my-3">
      <div className="d-flex justify-content-between">
        <h1>Items</h1>
        <button type="button" onClick={submit} className="btn btn-success">
          Add item
        </button>
      </div>
      {items.map((item) => (
        <div className="card my-2" key={item._id}>
          <div className="card-body">
            {editingItem === item._id ? (
              <form onSubmit={updateItem}>
                <div className="mb-3">
                  <label className="form-label">Place</label>
                  <input
                    type="text"
                    className="form-control"
                    name="place"
                    value={formValues.place}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Area</label>
                  <input
                    type="text"
                    className="form-control"
                    name="area"
                    value={formValues.area}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formValues.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mx-2"
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h5 className="card-title">{item.place}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">
                  {item.area}
                </h6>

                <p className="card-text">{item.description}</p>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => startEditing(item)}
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => deleteItem(item._id)}
                  className="btn btn-danger mx-3"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplaySellerItems;

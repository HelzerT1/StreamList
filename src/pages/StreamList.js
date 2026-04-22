import React, { useEffect, useState } from "react";

function StreamList() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("streamlistItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("streamlistItems", JSON.stringify(items));
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value.trim()) return;

    if (editId !== null) {
      const updatedItems = items.map((item) =>
        item.id === editId ? { ...item, text: value } : item
      );

      setItems(updatedItems);
      setEditId(null);
    } else {
      const newItem = {
        id: Date.now(),
        text: value,
        completed: false,
      };

      setItems([...items, newItem]);
    }

    setValue("");
  };

  const handleDelete = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };

  const handleComplete = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );

    setItems(updatedItems);
  };

  const handleEdit = (id) => {
    const itemToEdit = items.find((item) => item.id === id);

    if (!itemToEdit) return;

    setValue(itemToEdit.text);
    setEditId(id);
  };

  return (
    <section>
      <h1>StreamList</h1>
      <p>Add movies or shows you want to watch.</p>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. Interstellar"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">{editId !== null ? "Update" : "Add"}</button>
      </form>

      <div className="list-container">
        {items.length === 0 ? (
          <p className="empty-message">No items added yet.</p>
        ) : (
          <ul className="stream-list">
            {items.map((item) => (
              <li
                key={item.id}
                className={`list-item ${item.completed ? "completed" : ""}`}
              >
                <span>{item.text}</span>

                <div className="item-buttons">
                  <button
                    type="button"
                    className="complete-btn"
                    onClick={() => handleComplete(item.id)}
                  >
                    {item.completed ? "Undo" : "Complete"}
                  </button>

                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default StreamList;
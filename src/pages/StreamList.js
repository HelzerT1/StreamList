import React, { useState } from "react";

function StreamList() {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value.trim()) return;

    console.log("Added to StreamList:", value);
    setValue("");
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
        <button type="submit">Add</button>
      </form>
    </section>
  );
}

export default StreamList;
import React, { useState } from "react";
import { addNewMessage } from "./api";

export default function AddMessage() {
  const [messageData, setMessageData] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    body: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const { username, body } = formData;
    try {
      const response = await addNewMessage(username, body);
      setMessageData(response.createMessage);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="AddMessage">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          name="username"
          type="text"
          onChange={handleChange}
          value={formData.username}
          required
        />
        <input
          placeholder="message body"
          name="body"
          type="text"
          onChange={handleChange}
          value={formData.body}
          required
        />
        <button>Add message</button>
      </form>
      {messageData && (
        <p>
          {messageData.user.username} has created the following message:{" "}
          {messageData.body}
        </p>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { getAllUserMessages } from "./api";

export default function UserMessages() {
  const [formData, setFormData] = useState({
    user: "",
  });

  const [messages, setMessages] = useState({
    data: null,
    loading: false,
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData({ [name]: value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const { user } = formData;
    setMessages((m) => ({
      ...m,
      loading: true,
    }));
    try {
      const response = await getAllUserMessages(user);
      const messages = response.user.messages;
      setMessages({ data: messages, loading: false });
    } catch (e) {
      setMessages((m) => ({
        ...m,
        loading: false,
      }));
      console.log(e);
    }
  }

  if (messages.loading) return <p>Loading...</p>;

  return (
    <div className="UserMessages">
      <form onSubmit={handleSubmit}>
        <input
          name="user"
          type="text"
          onChange={handleChange}
          value={formData.user}
          required
        />
        <button>Get messages</button>
      </form>
      {messages.data && (
        <div id="messages">
          {messages.data.map((m) => (
            <p key={m.id}>{m.body}</p>
          ))}
        </div>
      )}
    </div>
  );
}

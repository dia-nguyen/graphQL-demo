import React, { useState } from "react";
import { addNewUser } from "./api";

export default function AddUser() {
  const [userData, setUserData] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const { username, firstName, lastName } = formData;
    try {
      const response = await addNewUser(username, firstName, lastName);
      setUserData(response.createUser);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="AddUser">
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
          placeholder="first name"
          name="firstName"
          type="text"
          onChange={handleChange}
          value={formData.firstName}
          required
        />
        <input
          placeholder="last name"
          name="lastName"
          type="text"
          onChange={handleChange}
          value={formData.lastName}
          required
        />
        <button>Create user</button>
      </form>
      {userData && <p>{userData.username} has been created</p>}
    </div>
  );
}

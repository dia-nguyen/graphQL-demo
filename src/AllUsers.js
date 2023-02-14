import { getAllUsers } from "./api";
import { useEffect, useState } from "react";
function AllUsers() {
  const [userInfo, setUserInfo] = useState({
    data: null,
    loading: true,
  });

  useEffect(fetchUserData, []);

  function fetchUserData() {
    async function fetchUser() {
      const response = await getAllUsers();
      setUserInfo({
        data: response,
        loading: false,
      });
    }
    fetchUser();
  }
  if (userInfo.loading) return <h1>Loading</h1>;
  return (
    <>
      <h1>List of Users</h1>
      <ul>
        {userInfo.data.users.map((u, i) => (
          <li key={i}>{u.username}</li>
        ))}
      </ul>
    </>
  );
}

export default AllUsers;

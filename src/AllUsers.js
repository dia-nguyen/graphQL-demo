import { getAllUsers } from "./api";
import { useEffect, useState } from "react";
function AllUsers() {
  const [userInfo, setUserInfo] = useState({
    data: null,
    loading: true
  })

  useEffect(fetchUserData, [])

  function fetchUserData() {
    async function fetchUser() {
      const response = await getAllUsers();
      setUserInfo({
        data: response,
        loading: false
      })
    }
    fetchUser();
  }
  console.log('userInfo',userInfo);
  if (userInfo.loading) return <h1>Loading</h1>
  return(
    <ul>
      {userInfo.data.users.map((u, i) => (
        <li key={u}>
          {u.username}
        </li>
      ))}
    </ul>
  )
}

export default AllUsers;

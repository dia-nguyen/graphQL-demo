import axios from "axios";
const BASE_API_URL = "https://users-messages-gql.herokuapp.com/graphql";

async function getAllUsers() {
  const query = `query {
    users {
      username,
      first_name,
      last_name,
    }
  }`;
  const response = await axios.post(BASE_API_URL, { query });
  return response.data.data;
}

async function getAllUserMessages(username) {
  const query = `query GetUserMessages($username: ID!) {
    user(username: $username) {
      username
      messages {
        id
        body
      }
    }
  }`;
  const variables = {
    username: username,
  };
  const response = await axios.post(BASE_API_URL, { query, variables });
  return response.data.data;
}

async function addNewUser(username, firstName, lastName) {
  const variables = {
    u: username,
    f: firstName,
    l: lastName,
  };
  const mutation = `
  mutation createUser($f: String!, $l: String!, $u: ID!) {
    createUser(username: $u, first_name: $f, last_name: $l) {
      username
      first_name
      last_name
    }
  }
  `;

  const response = await axios.post(BASE_API_URL, {
    query: mutation,
    variables,
  });
  return response.data.data;
}

async function addNewMessage(username, body) {
  const variables = {
    u: username,
    b: body,
  };
  const mutation = `
  mutation CreateMessage($b: String!, $u: ID!) {
    createMessage(username: $u, body: $b) {
      body
      user {
        username
        first_name
        last_name
      }
    }
  }`;

  const response = await axios.post(BASE_API_URL, {
    query: mutation,
    variables,
  });
  return response.data.data;
}

export { getAllUserMessages, getAllUsers, addNewMessage, addNewUser };

export const getUserByUsername = (state, username) =>
  state.users.users.find((usr) => usr.username === username);

export const getUsers = (state) => state.users.users;

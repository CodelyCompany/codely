export const getUserByUsername = (state, username) =>
  state.users.users.find((usr) => usr.username === username);

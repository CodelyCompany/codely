export const getUserByUsername = (username) => (state) =>
  state.users.users.find((usr) => usr.username === username);

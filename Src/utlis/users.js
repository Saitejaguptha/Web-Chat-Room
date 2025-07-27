const { rm } = require("fs");
const { get } = require("http");

const users = [];

const addUser = ({ id, username, room }) => {
  // Removing spaces and converting to lowercase
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Validating the input parameters
  if (!username || !room) return { error: "Required Username and Room!!!" };

  // Checking whether a user is in the room or not
  const existingUser = users.find(
    (user) => user.room === room && user.username === username
  );

  // If the user is existing, return an error
  if (existingUser) return { error: "Username is Already Taken" };

  // Store the user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };

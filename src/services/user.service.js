let AUTO_INCREMENT = 1;
const users = [];

// immutable
function findAll() {
  return [...users];
}

// immutable
function findOneById(userId) {
  return findAll().find((user) => user.id === userId);
}

function createOne(user) {
  const newUser = {
    id: AUTO_INCREMENT,
    name: user.name,
  }
  users.push(newUser);

  AUTO_INCREMENT += 1;

  return newUser;
}

function updateOneById(userId, userData) {
  const user = users.find((user) => user.id === userId);

  user.name = userData.name;

  return user;
}

function deleteOneById(userId) {
  const userIndex = users.findIndex((user) => user.id === userId);

  const userDeleted = users.splice(userIndex, 1);

  return userDeleted.length > 0;
}

const userService = {
  findAll,
  findOneById,
  createOne,
  updateOneById,
  deleteOneById
}

export default userService;

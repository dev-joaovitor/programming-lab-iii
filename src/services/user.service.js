let AUTO_INCREMENT = 1;
const users = [];

// immutable
function findAll() {
  return JSON.parse(JSON.stringify(users));
}

function findOneById(userId) {
  return findAll().find((user) => user.id === userId);
}

function findByCityId(cityId) {
  return findAll().filter((user) => user.city_id === cityId);
}

function createOne(user) {
  const newUser = {
    id: AUTO_INCREMENT,
    name: user.name,
    age: user.age,
    city_id: user.city_id,
  }
  users.push(newUser);

  AUTO_INCREMENT += 1;

  return {...newUser};
}

function updateOneById(userId, userData) {
  const user = users.find((user) => user.id === userId);

  user.name = userData.name;
  user.age = userData.age;
  user.city_id = userData.city_id;

  return {...user};
}

function deleteOneById(userId) {
  const userIndex = users.findIndex((user) => user.id === userId);

  const userDeleted = users.splice(userIndex, 1);

  return userDeleted.length > 0;
}

function total() {
  return users.length;
}

const userService = {
  findAll,
  findOneById,
  findByCityId,
  createOne,
  updateOneById,
  deleteOneById,
  total,
}

export default userService;

import orderHelper from "../helpers/order.helper.js";
import cityService from "../services/city.service.js";
import userService from "../services/user.service.js";

const ADULT_MINIMUM_AGE = 18;
const TRUTHY_QUERY_VALUE = ["yes", "1", "y"];
const FALSY_QUERY_VALUE = ["no", "0", "n"];
const ALLOWED_ORDER_BY = ["age"];
const ALLOWED_ORDER_DIRECTIONS = ["desc", "asc"];

function list(req, res) {
  const { isAdult, city, orderBy, orderDirection } = req.query
  const foundUsers = userService.findAll();
  let filteredUsers = [];

  for (const user of foundUsers) {
    user.city = cityService.findOneById(user.city_id);

    const cityFilter = city?.trim()?.toLowerCase()
    if (cityFilter
        && cityFilter != user.city.name.toLowerCase()) {
      continue;
    }

    delete user.city_id;

    if (TRUTHY_QUERY_VALUE.includes(isAdult)) {
      if (user.age < ADULT_MINIMUM_AGE) continue;
    } else if (FALSY_QUERY_VALUE.includes(isAdult)) {
      if (user.age >= ADULT_MINIMUM_AGE) continue;
    }

    filteredUsers.push(user);
  }

  if (orderBy && ALLOWED_ORDER_BY.includes(orderBy)) {
    let orderDirectionSanitized;
    if (orderDirection) {
      if (ALLOWED_ORDER_DIRECTIONS.includes(orderDirection.toLowerCase())) {
        orderDirectionSanitized = orderDirection.toLowerCase();
      } else {
        orderDirectionSanitized = "desc";
      }
    } else {
      orderDirectionSanitized = "desc";
    }

    filteredUsers = orderHelper.orderBy(
      filteredUsers,
      orderBy,
      orderDirectionSanitized
    );
  }

  return res.json({
    success: true,
    data: filteredUsers,
    message: "Users successfully fetched",
  });
}

function findById(req, res) {
  const userId = req.params.id
  const userFound = userService.findOneById(parseInt(userId));

  if (!userFound) {
    return res.status(404).json({
      success: false,
      data: null,
      message: "User not found",
    });
  }

  userFound.city = cityService.findOneById(userFound.city_id);
  delete userFound.city_id;

  return res.json({
    success: true,
    data: userFound,
    message: "User successfully fetched",
  });
}

function create(req, res) {
  const name = req.body.name?.trim();
  const city = req.body.city?.trim();
  let age = req.body.age;

  if (!name) {
    return res.status(422).json({
      success: false,
      data: null,
      message: "Missing required field: name",
    });
  }

  if (!age) {
    return res.status(422).json({
      success: false,
      data: null,
      message: "Missing required field: age",
    });
  }

  age = parseInt(age);

  if (isNaN(age)) {
    return res.status(422).json({
      success: false,
      data: null,
      message: "Invalid value: age must be a number",
    });
  }

  if (age < 1) {
    return res.status(422).json({
      success: false,
      data: null,
      message: "Invalid value: age must be positive and non-zero",
    });
  }

  if (!city) {
    return res.status(422).json({
      success: false,
      data: null,
      message: "Missing required field: city",
    });
  }

  let foundCity = cityService.findOneByName(city);

  if (!foundCity) {
    foundCity = cityService.createOne({ name: city });
  }

  const userCreated = userService.createOne({ name, age, city_id: foundCity.id });

  delete userCreated.city_id;
  userCreated.city = foundCity;

  return res.status(201).json({
    success: true,
    data: userCreated,
    message: "User successfully created",
  });
}

function update(req, res) {
  let userId = req.params.id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Missing user id",
    });
  }

  userId = parseInt(userId);
  const userFound = userService.findOneById(userId);

  if (!userFound) {
    return res.status(404).json({
      success: false,
      data: null,
      message: "User not found",
    });
  }

  const name = req.body.name?.trim();
  const city = req.body.city?.trim();
  let age = req.body.age;

  if (!name) {
    return res.status(422).json({
      success: false,
      data: null,
      message: "Missing required field: name",
    });
  }

  if (!age) {
    return res.status(422).json({
      success: false,
      data: null,
      message: "Missing required field: age",
    });
  }

  age = parseInt(age);

  if (isNaN(age)) {
    return res.status(422).json({
      success: false,
      data: null,
      message: "Invalid value: age must be a number",
    });
  }

  if (age < 1) {
    return res.status(422).json({
      success: false,
      data: null,
      message: "Invalid value: age must be positive and non-zero",
    });
  }

  if (!city) {
    return res.status(422).json({
      success: false,
      data: null,
      message: "Missing required field: city",
    });
  }

  let foundCity = cityService.findOneByName(city);

  if (!foundCity) {
    foundCity = cityService.createOne({ name: city });
  }

  const userUpdated = userService.updateOneById(userId, { name, age, city_id: foundCity.id });
  userUpdated.city = foundCity;
  delete userUpdated.city_id;

  return res.json({
    success: true,
    data: userUpdated,
    message: "User successfully updated",
  });
}

function remove(req, res) {
  let userId = req.params.id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Missing user id",
    });
  }

  userId = parseInt(userId);

  const userFound = userService.findOneById(userId);

  if (!userFound) {
    return res.status(404).json({
      success: false,
      data: null,
      message: "User not found",
    });
  }

  const userWasDeleted = userService.deleteOneById(userId);

  if (!userWasDeleted) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Failed to remove user",
    });
  }

  return res.json({
    success: true,
    data: null,
    message: "User successfully removed",
  });
}

function totalUsers(req, res) {
  return res.json({
    success: true,
    data: { total: userService.total() },
    message: "Total users successfully fetched",
  });
}

const userController = {
  list,
  findById,
  create,
  update,
  remove,
  totalUsers,
}

export default userController;

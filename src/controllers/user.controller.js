import userService from "../services/user.service.js";

function list(req, res) {
  const users = userService.findAll();

  return res.json({
    success: true,
    data: users,
    message: "Users successfully fetched",
  });
}

function create(req, res) {
  const name = req.body.name;

  if (!name) {
    return res.status(422).json({
      success: false,
      data: null,
      message: "Missing required field: name",
    });
  }

  const userCreated = userService.createOne({ name });

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

  const name = req.body.name;

  if (!name) {
    return res.status(422).json({
      success: false,
      data: null,
      message: "Missing required field: name",
    });
  }

  const userUpdated = userService.updateOneById(userId, { name });

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

const userController = {
  list,
  create,
  update,
  remove
}

export default userController;

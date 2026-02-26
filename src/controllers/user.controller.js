import userService from "../services/user.service.js";

function list(req, res) {
  const users = userService.listUsers();

  return res.json({
    success: true,
    data: users,
    action: "Users successfully fetched",
  });
}

const userController = {
  list
}

export default userController;

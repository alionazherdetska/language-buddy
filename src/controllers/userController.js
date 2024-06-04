import { userService } from '../services/userService.js';

async function getAll(req, res, next) {
  const users = await userService.getAllActive();
  res.send(users.map(userService.normalize));
}

async function getById(req, res, next) {
  const { id } = req.params;
  const user = await userService.getById(id);
  
  if (!user) {
    throw ApiError.NotFound();
  }

  res.send(userService.normalize(user));
}

export const userController = { getAll, getById };

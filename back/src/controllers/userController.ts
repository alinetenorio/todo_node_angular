import { Request, Response } from "express";

const UserService = require('../services/userService');

class UserController {
  
  async createUser (req: Request, res: Response) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).send(user);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message || "An error occurred" });
    }
  };
  
  async login (req: Request, res: Response) {
    try {
      const token = await UserService.login(req.body);
      res.status(200).json({ token })
    } catch (error: any) {
      res.status(error.status).json({ message: error.message || "An error occurred" });
    }
  }

}

module.exports = new UserController()
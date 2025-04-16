import { Request, Response } from "express";

const TaskService = require('../services/taskService');

class TaskController {

  async createTask (req: any, res: Response) {
    try {      
      const task = await TaskService.createTask(req.body, req.userId);
      res.status(201).send(task);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message || "An error occurred" });
    }
  };
  
  
  async getTasks (req: Request, res: Response) {
    const doneParam = req.query.done;
    const done = doneParam === 'true' ? true : doneParam === 'false' ? false : undefined;

    try { 
      const result = await TaskService.getTasks(done);
      res.send(result);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message || "An error occurred" });
    }
  };

  async updateTask (req: Request, res: Response) {
    try { 
      await TaskService.updateTask(req.params.id, req.body);
      res.status(200).send();
    } catch (error: any) {
      res.status(error.status).json({ message: error.message || "An error occurred" });
    }
  }
}

module.exports = new TaskController()
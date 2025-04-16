import { HttpException } from "../exceptions/exception";
import { Task } from "../types";

const taskRepository = require('../repositories/taskRepository')
const userRepository = require('../repositories/userRepository')

class TaskService {
  
  async createTask (task: Task, userId: number) {
    try {

      const user = await userRepository.getUserById(userId);
      task.user = { id: user.id, email: user.email,  name: user.name, password: '' };
      
      return await taskRepository.createTask(task);

    } catch (error) {
      throw new HttpException(400, 'Unable to create task')
    } 
  };

  async getTasks(done?: boolean) {
    try {
      const tasks = await taskRepository.getTasks(done);
      return tasks;
    } catch (error) {
      throw new HttpException(400, 'Unable to get tasks')
    } 
  };

  async updateTask(id: number, taskUpdated: Task) {
    try {
      id = Number(id)
      const task = await taskRepository.getTaskById(id);

      if(!task) {
        throw new HttpException(404, 'Not found')
      }

      task.description = taskUpdated.description
      task.done = taskUpdated.done
      task.priority = taskUpdated.priority

      return await taskRepository.updateTask(id, task)
    } catch (error) {
      throw new HttpException(400, 'Unable to update task')
    } 
  }

}

module.exports = new TaskService();
const TaskService = require('./taskService');
const userRepository = require('../repositories/userRepository');
const taskRepository = require('../repositories/taskRepository');

jest.mock('../repositories/userRepository');
jest.mock('../repositories/taskRepository');

describe('TaskService - createTask', () => {

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashedpassword',
  };

  const mockTask = {
    description: 'Test task',
    priority: 'high',
    done: false
  };

  beforeEach(() => {
    userRepository.getUserById = jest.fn().mockResolvedValue(mockUser);
    taskRepository.createTask = jest.fn().mockResolvedValue({ ...mockTask, id: 123 });
    jest.clearAllMocks();
  });

  it('should create a task successfully', async () => {
    
    userRepository.getUserById.mockResolvedValue(mockUser);
    taskRepository.createTask.mockResolvedValue({
      ...mockTask,
      user: { id: mockUser.id, email: mockUser.email, name: mockUser.name },
    });

    const result = await TaskService.createTask({ ...mockTask }, mockUser.id);

    expect(userRepository.getUserById).toHaveBeenCalledWith(mockUser.id);
    expect(taskRepository.createTask).toHaveBeenCalledWith(expect.objectContaining({
      description: 'Test task',
      priority: 'high',
      user: expect.objectContaining({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
      }),
    }));

    expect(result).toHaveProperty('description', 'Test task');
  });

  it('should throw an error if user is not found', async () => {
    userRepository.getUserById.mockResolvedValue(undefined);

    await expect(TaskService.createTask({ ...mockTask }, mockUser.id)).rejects.toThrow('Unable to create task');
  });

  it('should throw an error if createTask fails', async () => {
    userRepository.getUserById.mockResolvedValue(mockUser);
    taskRepository.createTask.mockRejectedValue(new Error('DB Error'));

    await expect(TaskService.createTask({ ...mockTask }, mockUser.id)).rejects.toThrow('Unable to create task');
  });
});

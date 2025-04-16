jest.mock('jsonwebtoken'); 
jest.mock('../utils/password', () => ({
  getHash: jest.fn(),
  comparePasswords: jest.fn()
}));

const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');
const { comparePasswords } = require('../utils/password');
const UserService = require('../services/userService');
const { HttpException } = require('../exceptions/exception');

describe('UserService', () => {  

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  describe('createUser', () => {
    it('should throw error if email already taken', async () => {
      const mockUser = { email: 'test@example.com', name: 'John Doe', password: '123' };

      jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValue(mockUser);


      await expect(UserService.createUser(mockUser)).rejects.toThrowError(new HttpException(409, 'Email already taken'));
    });

    it('should create a user successfully', async () => {

      const inputUser = { email: 'test@example.com', name: 'Jane', password: '123' };
      const savedUser = { ...inputUser, password: 'hashedPassword' };

      jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValue(null);
      jest.spyOn(userRepository, 'createUser').mockResolvedValue(savedUser);

      const result = await UserService.createUser(inputUser);

      expect(result).toEqual(savedUser);
    
    });

    it('should throw error if user creation fails', async () => {
      jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValue(null); // No user exists
      jest.spyOn(userRepository, 'createUser').mockRejectedValue(new Error('Error creating user'));

      const mockUser = { name: 'User X', email: 'x@example.com', password: '123' };

      const { getHash } = require('../utils/password');
      getHash.mockResolvedValue('hashedPassword');

      await expect(UserService.createUser(mockUser)).rejects.toThrowError(
        new HttpException(400, 'Unable to create user')
      );
    });
  });

  describe('login', () => {
    it('should throw error if email is not found', async () => {
      const mockUserLogin = { email: 'x@example.com', password: '123' };

      jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValue(null); // No user
      
      await expect(UserService.login(mockUserLogin)).rejects.toThrowError(new HttpException(401, 'Authentication failed'));
    });

    it('should throw error if password does not match', async () => {
      const mockUser = { name: 'User X', email: 'x@example.com', password: '123' };
      const mockUserLogin = { email: 'x@example.com', password: '123' };

      jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValue(mockUser);
      
      comparePasswords.mockResolvedValue(false); // Password does not match

      await expect(UserService.login(mockUserLogin)).rejects.toThrowError(new HttpException(401, 'Authentication failed'));
    });

    it('should return token on successful login', async () => {
      const mockUser = { name: 'User X', email: 'x@example.com', password: '123' };
      const mockUserLogin = { email: 'x@example.com', password: '123' };

      jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValue(mockUser);

      comparePasswords.mockResolvedValue(true); // Password matches
      jwt.sign.mockReturnValue('fakeToken'); // Mock JWT token generation

      const result = await UserService.login(mockUserLogin);

      expect(result).toBe('fakeToken');
      expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUser.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    });
  });
});


import { HttpException } from "../exceptions/exception";
import { User, UserLogin } from "../types";
import { getHash, comparePasswords } from "../utils/password";
const jwt = require('jsonwebtoken');

const userRepository = require('../repositories/userRepository')

class UserService {
  
  async createUser (user: User) {
    const userExists = await userRepository.getUserByEmail(user.email);
    
    if (userExists) {
      throw new HttpException(409, 'Email already taken');
    }

    try {
      const hashPassword = await getHash(user.password!);
      if(hashPassword) {
        user = { name: user.name, email: user.email, password: hashPassword }
      }

      return await userRepository.createUser(user);

    } catch (error) {
      throw new HttpException(400, 'Unable to create user')
    } 
  };

  async login (userLogin: UserLogin) {
    const user = await userRepository.getUserByEmail(userLogin.email);
    
    if (!user) {
      throw new HttpException(401, 'Authentication failed');
    }

    const passwordMatches = await comparePasswords(userLogin.password, user.password)
    if (!passwordMatches) {
      throw new HttpException(401, 'Authentication failed');
    }

    const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });
    
    return token;

  }

}

module.exports = new UserService();
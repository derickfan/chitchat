const db = require("../models");

interface UserData {
  username: string;
  password: string;
  email: string;
  profilePhotoUrl?: string;
}

const { User } = db;
class UserController {
  
  defaultMethod() {
    return {
      text: "Hello world"
    };
  }

  async createUser(data: UserData) {
    try {
      const user = await User.create(data);
      return user;
    } catch (err) {
      console.log(err);
    }
  }
  
  async getUser() {
    try {
      const users = await User.findAll();
      return users;
    } catch (err) {
      console.log(err);
    }
  }

  async updateUser() {

  }

  async deleteUser() {

  }

}

export = new UserController();
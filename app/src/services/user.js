import api from './api';

export class UserService {
  static async create(username, email, password) {
    await api.post('/users', {
      username,
      email,
      password,
    });
  }
}

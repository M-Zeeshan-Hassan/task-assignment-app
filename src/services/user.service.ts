import { api } from '@/lib/api';
import { User } from '@/types';

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data;
  },

  async searchUsers(query: string): Promise<User[]> {
    const response = await api.get(`/users/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  async getUser(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },
};
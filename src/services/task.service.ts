import { api } from '@/lib/api';
import { Task, SubTask, TaskInvitation, User } from '@/types';

export const taskService = {
  // Tasks
  async getTasks(): Promise<Task[]> {
    const response = await api.get('/tasks');
    return response.data;
  },

  async getTask(id: string): Promise<Task> {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  async createTask(data: {
    title: string;
    description?: string;
    assignedUserIds?: string[];
  }): Promise<Task> {
    const response = await api.post('/tasks', data);
    return response.data;
  },

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  // Subtasks
  async createSubTask(taskId: string, data: {
    title: string;
    description?: string;
    assignedUserId?: string;
    dueDate?: string;
  }): Promise<SubTask> {
    const response = await api.post(`/tasks/${taskId}/subtasks`, data);
    return response.data;
  },

  async updateSubTask(id: string, data: Partial<SubTask>): Promise<SubTask> {
    const response = await api.put(`/subtasks/${id}`, data);
    return response.data;
  },

  async deleteSubTask(id: string): Promise<void> {
    await api.delete(`/subtasks/${id}`);
  },

  // Invitations
  async inviteUser(taskId: string, inviteeId: string): Promise<TaskInvitation> {
    const response = await api.post(`/tasks/${taskId}/invite`, { inviteeId });
    return response.data;
  },

  async respondToInvitation(invitationId: string, accept: boolean): Promise<TaskInvitation> {
    const response = await api.post(`/tasks/invitations/${invitationId}/respond`, { accept });
    return response.data;
  },
};
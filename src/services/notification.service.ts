import { api } from '@/lib/api';
import { Notification } from '@/types';

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    const response = await api.get('/notifications');
    return response.data;
  },

  async getUnreadCount(): Promise<number> {
    const response = await api.get('/notifications/unread-count');
    return response.data;
  },

  async markAsRead(id: string): Promise<Notification> {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  async markAllAsRead(): Promise<void> {
    await api.put('/notifications/read-all');
  },

  async deleteNotification(id: string): Promise<void> {
    await api.delete(`/notifications/${id}`);
  },
};
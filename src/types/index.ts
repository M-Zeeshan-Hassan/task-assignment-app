export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  creator: User;
  assignedUsers: User[];
  subtasks: SubTask[];
  _count?: {
    subtasks: number;
  };
}

export interface SubTask {
  id: string;
  title: string;
  description?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  dueDate?: string;
  taskId: string;
  assignedUserId?: string;
  assignedUser?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  metadata?: any;
}

export interface TaskInvitation {
  id: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  taskId: string;
  task: Task;
  inviterId: string;
  inviter: User;
  inviteeId: string;
  invitee: User;
  createdAt: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}
'use client';

import { Task } from '@/types';
import { Calendar, User, MoreVertical, Clock, Flag, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdate }) => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-100 text-red-800';
      case 'MEDIUM':
        return 'bg-orange-100 text-orange-800';
      case 'LOW':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">No tasks yet</h3>
        <p className="text-gray-500 max-w-sm mx-auto mb-6">
          Create your first task to get started with your project management journey.
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Header with title and status */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5"></div>
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status.replace('_', ' ')}
                  </span>
                  <button 
                    onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Description */}
              {task.description && (
                <p className="text-gray-600 mb-4 leading-relaxed">{task.description}</p>
              )}

              {/* Metadata */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {/* Assigned Users */}
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>
                      {task.assignedUsers.length} assigned
                    </span>
                  </div>
                  
                  {/* Subtasks Progress */}
                  {task.subtasks && task.subtasks.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${(task.subtasks.filter(st => st.status === 'COMPLETED').length / task.subtasks.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-xs">
                        {task.subtasks.filter(st => st.status === 'COMPLETED').length}/
                        {task.subtasks.length}
                      </span>
                    </div>
                  )}

                  {/* Comments */}
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>3</span>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Created {formatDate(task.createdAt)}</span>
                </div>
              </div>

              {/* Assigned Users Avatars */}
              {task.assignedUsers.length > 0 && (
                <div className="flex items-center space-x-2 mt-4">
                  <div className="flex -space-x-2">
                    {task.assignedUsers.slice(0, 3).map((user, index) => (
                      <div
                        key={user.id}
                        className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white shadow-sm"
                        style={{ zIndex: 3 - index }}
                      >
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                    ))}
                    {task.assignedUsers.length > 3 && (
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white shadow-sm">
                        +{task.assignedUsers.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
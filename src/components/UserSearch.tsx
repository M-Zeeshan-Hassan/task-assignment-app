'use client';

import { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { userService } from '@/services/user.service';
import { User } from '@/types';

export const UserSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.length < 2) {
      setUsers([]);
      return;
    }

    setLoading(true);
    try {
      const foundUsers = await userService.searchUsers(searchQuery);
      setUsers(foundUsers);
    } catch (error) {
      console.error('Search failed:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (userId: string) => {
    // We'll implement this when we have task context
    alert(`Invite user ${userId} - This will be implemented with task context`);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search users by name or email..."
        />
      </div>

      {loading && (
        <div className="text-center py-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      )}

      {users.length > 0 && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-1">
                  {user.role}
                </span>
              </div>
              <button
                onClick={() => handleInvite(user.id)}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                <UserPlus className="h-4 w-4" />
                <span>Invite</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {query.length >= 2 && users.length === 0 && !loading && (
        <p className="text-center text-gray-500 py-4">No users found</p>
      )}
    </div>
  );
};
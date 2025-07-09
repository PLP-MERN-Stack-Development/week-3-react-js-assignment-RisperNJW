import { useState, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';
import Button from './Button';
import Card from './Card';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5&q=${searchTerm}`
        );
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [page, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="min-h-screen p-4">
      <Card className={`max-w-4xl mx-auto transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-6">
          {/* Header with Theme Switch */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                User Management
              </h2>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Manage and organize your users
              </p>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className={`flex-grow px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                }`}
              />
              <Button 
                type="submit" 
                variant="primary"
                className="px-6 py-3 font-medium"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Loading and Error States */}
          {loading && (
            <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="animate-pulse flex flex-col items-center">
                <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Loading users...
              </div>
            </div>
          )}
          
          {error && (
            <div className={`py-4 px-4 rounded-lg mb-6 ${
              darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-600'
            }`}>
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* User List */}
          {!loading && !error && (
            <div className="space-y-3">
              {users.length === 0 ? (
                <div className="text-center py-8">
                  <div className={darkMode ? 'text-gray-500' : 'text-gray-400'}>
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No users found
                  </p>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {searchTerm ? 'Try a different search term' : 'Add your first user'}
                  </p>
                </div>
              ) : (
                users.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-4 border rounded-lg transition-colors duration-200 ${
                      darkMode 
                        ? 'border-gray-700 hover:bg-gray-700' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center justify-center h-10 w-10 rounded-full ${
                        darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'
                      }`}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {user.name}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary">
                        View
                      </Button>
                      <Button size="sm" variant="danger">
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && users.length > 0 && (
            <div className={`flex justify-between items-center mt-6 pt-4 border-t ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <Button 
                onClick={() => setPage(p => Math.max(1, p - 1))} 
                disabled={page === 1}
                variant="secondary"
                className="px-4 py-2"
              >
                Previous
              </Button>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Page {page}
              </span>
              <Button 
                onClick={() => setPage(p => p + 1)} 
                disabled={users.length < 5}
                variant="secondary"
                className="px-4 py-2"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default UserList;
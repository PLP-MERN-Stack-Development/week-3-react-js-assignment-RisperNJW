import React, { useState, useEffect } from 'react';
import useLocalStorage from '../Hooks/useLocalStorage';
import Button from './Button';
import Card from '../components/Card';
import { useTheme } from '../Context/ThemeContext';

/**
 * Custom hook for managing tasks with localStorage persistence
 */
const useLocalStorageTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (text.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
};

const TaskManager = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useLocalStorageTasks();
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');
  const { darkMode } = useTheme();

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTaskText);
    setNewTaskText('');
  };

  return (
    <div className="min-h-screen p-4">
      <Card className={`max-w-2xl mx-auto transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-6">
          <div className="mb-8">
            <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Task Manager
            </h2>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Organize your daily tasks efficiently
            </p>
          </div>

          {/* Task input form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="What needs to be done?"
                className={`flex-grow px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-800'
                }`}
              />
              <Button 
                type="submit" 
                variant="primary"
                className="px-6 py-3 font-medium"
              >
                Add Task
              </Button>
            </div>
          </form>

          {/* Filter buttons */}
          <div className={`flex gap-2 mb-6 p-2 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            {['all', 'active', 'completed'].map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter(filterType)}
                className="capitalize flex-1 py-2"
              >
                {filterType}
              </Button>
            ))}
          </div>

          {/* Task list */}
          <div className="mb-8">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8">
                <div className={darkMode ? 'text-gray-500' : 'text-gray-400'}>
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                  No tasks found
                </p>
                <p className={darkMode ? 'text-gray-500' : 'text-gray-400'}>
                  {filter === 'all' 
                    ? 'Add your first task above' 
                    : `No ${filter} tasks at the moment`}
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    className={`flex items-center justify-between p-4 border rounded-lg transition-colors duration-200 ${
                      darkMode 
                        ? 'border-gray-700 hover:bg-gray-700' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="absolute opacity-0 h-0 w-0 peer"
                          id={`task-${task.id}`}
                        />
                        <label 
                          htmlFor={`task-${task.id}`} 
                          className={`flex items-center justify-center h-6 w-6 border-2 rounded-md peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-focus:ring-2 peer-focus:ring-blue-200 transition-all duration-200 cursor-pointer ${
                            darkMode 
                              ? 'border-gray-500 peer-focus:ring-blue-800' 
                              : 'border-gray-300'
                          }`}
                        >
                          {task.completed && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </label>
                      </div>
                      <div>
                        <span
                          className={`block ${
                            task.completed 
                              ? `line-through ${darkMode ? 'text-gray-400' : 'text-gray-500'}` 
                              : darkMode ? 'text-gray-200' : 'text-gray-800'
                          }`}
                        >
                          {task.text}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {new Date(task.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      aria-label="Delete task"
                      className="hover:scale-105 transition-transform duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Task stats */}
          <div className={`flex justify-between items-center text-sm border-t pt-4 ${
            darkMode 
              ? 'border-gray-700 text-gray-400' 
              : 'border-gray-200 text-gray-500'
          }`}>
            <p>
              {tasks.filter((task) => !task.completed).length} tasks remaining
            </p>
            {tasks.length > 0 && (
              <p>
                {((tasks.filter(task => task.completed).length / tasks.length) * 100).toFixed(0)}% completed
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskManager;
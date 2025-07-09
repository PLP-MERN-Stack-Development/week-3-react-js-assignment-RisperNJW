import { useCallback, useMemo } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useTaskManager() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  // Add a new task
  const addTask = useCallback((text) => {
    if (!text.trim()) return;
    setTasks(prev => [...prev, {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }]);
  }, [setTasks]);

  // Toggle task completion status
  const toggleTask = useCallback((id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { 
        ...task, 
        completed: !task.completed,
        updatedAt: new Date().toISOString()
      } : task
    ));
  }, [setTasks]);

  // Update task text
  const updateTask = useCallback((id, newText) => {
    if (!newText.trim()) return;
    setTasks(prev => prev.map(task => 
      task.id === id ? { 
        ...task, 
        text: newText,
        updatedAt: new Date().toISOString()
      } : task
    ));
  }, [setTasks]);

  // Delete a task
  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  // Clear all completed tasks
  const clearCompleted = useCallback(() => {
    setTasks(prev => prev.filter(task => !task.completed));
  }, [setTasks]);

  // Get filtered tasks (memoized for performance)
  const getFilteredTasks = useCallback((filterType) => {
    switch (filterType) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }, [tasks]);

  // Task statistics (memoized)
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const remaining = total - completed;
    return { total, completed, remaining };
  }, [tasks]);

  // Reorder tasks
  const reorderTasks = useCallback((startIndex, endIndex) => {
    setTasks(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, [setTasks]);

  return {
    tasks,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    clearCompleted,
    getFilteredTasks,
    stats,
    reorderTasks
  };
}
import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-teal-600 dark:bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-center items-center space-x-16 ">
        <Link to="/" className="text-xl font-bold">TaskApp</Link>
        <div className="space-x-16 hidden md:flex text-lg ">
          <Link to="/">Home</Link>
          <Link to="/tasks">Tasks</Link> 
          <Link to="/users">Users</Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar
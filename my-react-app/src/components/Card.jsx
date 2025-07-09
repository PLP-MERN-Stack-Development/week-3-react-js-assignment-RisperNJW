import React from 'react';

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-gray-200 shadow rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
};
export default Card
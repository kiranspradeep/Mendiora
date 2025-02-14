import React from "react";

const Card = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export { Card, CardContent };
import React from "react";

const Table = ({ children, className }) => {
  return <table className={`w-full border-collapse ${className}`}>{children}</table>;
};

const TableHeader = ({ children }) => {
  return <thead className="bg-gray-100">{children}</thead>;
};

const TableRow = ({ children, className }) => {
  return <tr className={`border-b ${className}`}>{children}</tr>;
};

const TableHead = ({ children, className }) => {
  return <th className={`text-left px-4 py-2 font-semibold ${className}`}>{children}</th>;
};

const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const TableCell = ({ children, className }) => {
  return <td className={`px-4 py-2 ${className}`}>{children}</td>;
};

export { Table, TableHeader, TableRow, TableHead, TableBody, TableCell };

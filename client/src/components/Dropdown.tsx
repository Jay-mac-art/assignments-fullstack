// src/components/Dropdown.tsx
import React from 'react';

interface DropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export const Dropdown: React.FC<DropdownProps> = ({ label, value, onChange, options }) => {
  return (
    <div className="mb-4">
      <label className="block text-lg font-semibold mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};
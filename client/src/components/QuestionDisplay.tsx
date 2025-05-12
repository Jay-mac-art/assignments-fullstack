// src/components/QuestionDisplay.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface QuestionDisplayProps {
  question: string;
  criteria: string;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question, criteria }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4"
    >
      <h3 className="text-xl font-bold text-blue-400">{question}</h3>
      <p className="text-gray-300 mt-2"><span className="font-semibold">Criteria:</span> {criteria}</p>
    </motion.div>
  );
};
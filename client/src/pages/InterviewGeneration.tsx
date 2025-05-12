import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { TagsInput } from '../components/TagsInput';
import { Dropdown } from '../components/Dropdown';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

const ReviewLoader: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-8 space-y-4">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    <p className="text-gray-400">Generating Interview Questions</p>
  </div>
);

export const InterviewGeneration = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState('junior');
  const [count, setCount] = useState<number>(10);
  const [questions, setQuestions] = useState<{ question: string; criteria: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Please login to continue');
      return navigate('/login');
    }
    fetchProfile(token);
  }, []);

  const fetchProfile = async (token: string) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BE_API_URL}/auth/user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSkills(data.skills || []);
      setTechnologies(data.technologies || []);
      if (data.experienceLevel) setExperienceLevel(data.experienceLevel);
      if (data.count) setCount(data.count);
    } catch (err) {
      console.error(err);
      alert('Failed to load profile, please login again');
      localStorage.removeItem('access_token');
      navigate('/login');
    }
  };

  const generateQuestions = async () => {
    setQuestions([]);
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const { data } = await axios.post(
        `${import.meta.env.VITE_BE_API_URL}/ai/generate-questions`,
        { skills, technologies, experienceLevel, count },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuestions(data);
    } catch (error) {
      console.error(error);
      alert('Error generating questions');
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const questionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.3 } }),
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl relative">
      {/* Form Section */}
      <div ref={formRef} className="bg-gray-700 p-8 rounded-lg shadow-lg">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-4xl font-extrabold mb-8 text-gradient bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 text-center"
        >
          Generate Interview Questions
        </motion.h1>
        <div className="space-y-4">
          <TagsInput label="Skills" tags={skills} setTags={setSkills} darkMode />
          <TagsInput label="Technologies" tags={technologies} setTags={setTechnologies} darkMode />
          <Dropdown
            label="Experience Level"
            value={experienceLevel}
            onChange={setExperienceLevel}
            options={['junior', 'mid-level', 'senior']}
            darkMode
          />
          <div className="flex items-center space-x-2">
            <label htmlFor="count" className="text-gray-300">Number of Questions:</label>
            <input
              id="count"
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-20 px-2 py-1 rounded-lg bg-gray-600 text-white"
            />
          </div>
        </div>
        <div className="flex justify-center space-x-6 mt-8">
          <button
            onClick={() => fetchProfile(localStorage.getItem('access_token') || '')}
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow hover:from-indigo-600 hover:to-blue-600 transition"
          >
            Reload User Profile
          </button>
          <button
            onClick={generateQuestions}
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow hover:from-green-600 hover:to-teal-600 transition disabled:opacity-50"
          >
            Generate Questions
          </button>
        </div>
      </div>

      {/* Questions Section */}
      {(loading || questions.length > 0) && (
        <div className="mt-10 bg-gray-700 p-6 rounded-lg shadow-lg max-h-[60vh] overflow-y-auto">
          {loading ? (
            <ReviewLoader />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold mb-4 text-gradient bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 text-center">
                Your Generated Questions
              </h2>
              {questions.map((q, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={questionVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-gray-900 p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Question {i + 1}:
                  </h3>
                  <p className="text-gray-200 mb-4">
                    {q.question}
                  </p>
                  <p className="text-gray-400">
                    <strong>Evaluation Criteria:</strong> {q.criteria}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {/* Edit Skills Button */}
      {questions.length > 0 && (
        <button
          onClick={scrollToForm}
          className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition flex items-center justify-center"
          aria-label="Edit Skills"
        >
          <ArrowUp className="w-6 h-6 animate-bounce" />
        </button>
      )}
    </div>
  );
};

import { useEffect, useState } from 'react';
import axios from 'axios';
import { TagsInput } from '../components/TagsInput';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
export const ProfileUpdate = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) return navigate('/login');
    axios
      .get(`${import.meta.env.VITE_BE_API_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { username, email, skills, technologies, comment } = res.data;
        setUsername(username);
        setEmail(email);
        setSkills(skills || []);
        setTechnologies(technologies || []);
        setComment(comment || '');
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      await axios.post(
        `${import.meta.env.VITE_BE_API_URL}/auth/update`,
        {
          username,
          email,
          password: password || undefined,
          skills,
          technologies,
          comment,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Profile updated successfully');
      navigate('/interview-generation');
    } catch {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-2xl mt-6">
      <h1 className="text-3xl text-white font-bold mb-6">Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-gray-300">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="text-gray-300">Password (leave blank to keep)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
          />
        </div>
        <TagsInput label="Skills" tags={skills} setTags={setSkills} />
        <TagsInput label="Technologies" tags={technologies} setTags={setTechnologies} />
        <div>
          <label className="text-gray-300">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 h-24 rounded-lg bg-gray-700 text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl shadow hover:from-green-600 hover:to-teal-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
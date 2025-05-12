

interface TagsInputProps {
  label: string;
  tags: string[];
  setTags: (tags: string[]) => void;
}

export const TagsInput: React.FC<TagsInputProps> = ({ label, tags, setTags }) => {
  const [input, setInput] = useState('');

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const newTag = input.trim();
    if (e.key === 'Enter' && newTag && !tags.includes(newTag)) {
      e.preventDefault(); // Prevent form submission
      setTags([...tags, newTag]);
      setInput('');
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4">
      <label className="block text-lg font-semibold mb-2 text-gray-300">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="bg-blue-500 text-white px-2 py-1 rounded flex items-center"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="ml-2 text-sm"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTag}
        placeholder={`Add ${label.toLowerCase()}... (Press Enter)`}
        className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
      />
    </div>
  );
};
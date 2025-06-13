import { useState } from 'react';
import { fetchScoreByRegistrationNumber } from './services/scoreService';
import { FiSearch } from 'react-icons/fi';
import Card from './ui/Card';

const UserRegistration = ({ setScoreData }) => {
  const [regNumber, setRegNumber] = useState('');
  const [error, setError] = useState(null); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    if (!regNumber.trim()) {
      setError('Please enter a registration number.');
      setScoreData(null);
      return;
    }

    try {
      const res = await fetchScoreByRegistrationNumber(regNumber);
      setScoreData(res);
      setError(null);
    } catch (err) {
      console.error('Error fetching score:', err);
      setScoreData(null);
      setError('No data found for this registration number.');
    }
  };

  return (
    <Card title="Search Scores" icon={<FiSearch />}>
      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <input
          type="text"
          placeholder="Enter registration number"
          value={regNumber}
          onChange={(e) => setRegNumber(e.target.value)}
          className={`border px-4 py-2 rounded-md focus:outline-none focus:ring w-full ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-300'
              : 'border-gray-300 focus:border-blue-400 focus:ring-blue-200'
          }`}
        />
    
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2 justify-center"
        >
          <FiSearch />
          Search
        </button>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </form>
    </Card>
  );
};

export default UserRegistration;

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async () => {
    if (!keyword.trim()) {
      setError('Please enter a keyword');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/search?keyword=${encodeURIComponent(keyword)}`);
      if (response.data.results.length === 0) {
        setError('No results found.');
      } else {
        setResults(response.data.results);
      }
    } catch (err) {
      setError('Error occurred while fetching results.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Instagram User Search</h1>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword"
      />
      <button onClick={search} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <div className="error">{error}</div>}

      <div className="results">
        {results.length > 0 && results.map((result, index) => (
          <div key={index} className="result-item">
            <p>Username: {result.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

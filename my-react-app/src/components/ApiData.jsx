import { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';

const ApiData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?q=${searchTerm}&_page=${page}&_limit=10`
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, searchTerm]);

  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">API Data</h2>
      
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="w-full p-2 border rounded-md"
          placeholder="Search posts..."
        />
      </div>

      {loading && <div className="text-center py-4">Loading...</div>}
      {error && <div className="text-red-500 py-4">{error}</div>}

      <ul className="space-y-4 mb-4">
        {data.map(item => (
          <li key={item.id} className="border-b pb-4">
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{item.body}</p>
          </li>
        ))}
      </ul>

      <div className="flex justify-between">
        <Button 
          onClick={() => setPage(p => Math.max(1, p - 1))} 
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="self-center">Page {page}</span>
        <Button 
          onClick={() => setPage(p => p + 1)} 
          disabled={data.length < 10}
        >
          Next
        </Button>
      </div>
    </Card>
  );
};

export default ApiData;
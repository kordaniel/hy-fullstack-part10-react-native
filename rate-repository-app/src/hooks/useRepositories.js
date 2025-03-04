/* NOTE: This file is not used in the project, but exists solely as a reference to the materials

import { useState, useEffect } from 'react';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchRepositories = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://192.168.89.192:5000/api/repositories');
      if (!response.ok) {
        const text = await response.text();
        const obj = JSON.parse(text);
        throw new Error(`Response status: ${response.status}: ${obj.message}`);
      } else {
        setError(undefined);
        setRepositories(await response.json());
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, error, loading, refetch: fetchRepositories };
};

export default useRepositories;
*/

import { useState, useEffect } from 'react';

export const useContent = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        let res;
        try {
          res = await fetch(`${API_URL}/api/content`);
          if (!res.ok) throw new Error();
        } catch (e) {
          res = await fetch('/content.json');
        }
        
        const data = await res.json();
        setContent(data);
      } catch (err) {
        setError(err);
        console.error('Failed to load content', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error };
};

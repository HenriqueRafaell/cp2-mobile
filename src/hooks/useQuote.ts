import { useState, useEffect } from 'react';
import { Quote } from '../types';
import { ApiService } from '../services/apiService';

interface UseQuoteResult {
  quote: Quote | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export const useQuote = (): UseQuoteResult => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await ApiService.getRandomQuote();
        if (!cancelled) {
          setQuote(data);
        }
      } catch {
        if (!cancelled) {
          setError('Não foi possível carregar a citação.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };
    fetch();
    return () => {
      cancelled = true;
    };
  }, [trigger]);

  const refresh = () => setTrigger(prev => prev + 1);

  return { quote, isLoading, error, refresh };
};

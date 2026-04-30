import { Quote } from '../types';

const BASE_URL = 'https://dummyjson.com';

export const ApiService = {
  async getRandomQuote(): Promise<Quote> {
    const randomId = Math.floor(Math.random() * 100) + 1;
    const response = await fetch(`${BASE_URL}/quotes/${randomId}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar citação');
    }
    const data = await response.json();
    return data as Quote;
  },

  async getQuotes(limit: number = 5): Promise<Quote[]> {
    const response = await fetch(`${BASE_URL}/quotes?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar citações');
    }
    const data = await response.json();
    return (data.quotes ?? []) as Quote[];
  },
};

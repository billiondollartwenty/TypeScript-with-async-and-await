import { fetchAndProcessArticles, ProcessedArticle, Article } from '../src/fetchAndProcessArticles';

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('fetchAndProcessArticles function', () => {
  it('successfully fetches and processes articles', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, title: 'Test Article 1', content: 'Content of test article 1' },
      ]),
    });

    const processedArticles = await fetchAndProcessArticles('https://api.example.com/articles');
    
    expect(processedArticles[0]).toHaveProperty('id');
    expect(processedArticles[0]).toHaveProperty('title');
    expect(processedArticles[0]).toHaveProperty('content');
    expect(processedArticles[0]).toHaveProperty('timestamp');
    expect(processedArticles[0]).toHaveProperty('status', 'processed');
  });

  it('handles errors during article fetching', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(fetchAndProcessArticles('https://api.example.com/articles'))
      .rejects
      .toThrow('Failed to fetch articles: 404');
  });

  it('handles exceptions thrown during processing', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchAndProcessArticles('https://api.example.com/articles'))
      .rejects
      .toThrow('Error processing articles');
  });
});
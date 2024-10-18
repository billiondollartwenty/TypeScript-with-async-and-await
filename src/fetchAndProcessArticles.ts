export interface Article {
  id: number;
  title: string;
  content: string;
}

export interface ProcessedArticle extends Article {
  // TODO: add the properties
    timestamp: string;
    status: string;
}

// TODO: type the function parameter and its return type
export async function fetchAndProcessArticles(url: string): Promise<ProcessedArticle[]>{
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }
    const articles: Article[] = await response.json();
    
    const processedArticles: ProcessedArticle[] = articles.map(article => ({
      ...article,
      timestamp: new Date().toISOString(),
      status: 'processed'
    }));
      
     return processedArticles; // Return the processed articles
  } catch (error) {
    console.error(error);
    throw new Error(`Error processing articles: ${error.message}`);
  }
}


import {
  api_key,
  category,
  country_code,
  articles_url,
} from '../config/rest_config';

export async function getArticles() {
  try {
    let articles = await fetch(
      `${articles_url}?country=${country_code}&
       category=${category}`,
      {
        headers: {
          'X-API-KEY': api_key,
        },
      },
    );

    let result = await articles.json();
    console.log(result.articles[0]);

    return result.articles;
  } catch (error) {
    throw error;
  }
}

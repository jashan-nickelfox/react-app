import axios from 'axios';

const UNSPLASH_BASE_URL = 'https://api.unsplash.com';
const UNSPLASH_ACCESS_KEY = 'nZIbZniHgnGCGKbaRLtUtP52i06KSQoBHAoozkTj9pM';

export const searchUnsplashImages = async (query, page = 1, perPage = 20) => {
  try {
    const response = await axios.get(`${UNSPLASH_BASE_URL}/search/photos`, {
      params: {
        query, page, per_page: perPage,
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    return {
      results: response.data.results,
      total: response.data.total,
    };
  } catch (error) {
    console.error('Error fetching Unsplash images:', error);
    return { results: [], total: 0 };
  }
};
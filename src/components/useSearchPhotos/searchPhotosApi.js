import { createApi } from 'unsplash-js';

async function searchPhotosApi(key, query) {
  const unsplash = createApi({
    accessKey: key,
  });

  try {
    const response = await unsplash.search.getPhotos({
      query,
    });

    if (response.type === 'success') {
      return response.response.results;
    } else {
      throw new Error('Search failed');
    }
  } catch (error) {
    throw error;
  }
}

export default searchPhotosApi;

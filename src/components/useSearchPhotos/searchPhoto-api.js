import Unsplash, { toJson } from 'unsplash-js';

async function SearchPhotosApi(key, query) {
  const unsplash = new Unsplash({
    accessKey: key,
  });

  return unsplash.search
    .photos(query)
    .then(toJson)
    .then((json) => {
      return json.results;
    });
}

export default SearchPhotosApi;

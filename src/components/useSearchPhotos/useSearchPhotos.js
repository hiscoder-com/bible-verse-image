import { useState, useEffect } from 'react';
import searchPhotosApi from './searchPhotosApi';

function useSearchPhotos({ key, query }) {
  const [arrayQuery, setArrayQuery] = useState([]);
  const [queryUse, setQueryUse] = useState();
  useEffect(() => {
    if (query?.length > 2) {
      searchPhotosApi(key, query).then((array) => {
        setArrayQuery(array);
        setQueryUse(query);
      });
    }
  }, [key, query]);
  return { arrayQuery, queryUse };
}

export default useSearchPhotos;

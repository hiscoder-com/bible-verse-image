import { useState, useEffect } from 'react';
import searchPhotosApi from './searchPhotosApi';

function useSearchPhotos({ key, query }) {
  const [arrayQuery, setArrayQuery] = useState([]);
  useEffect(() => {
    if (query?.length > 2) {
      searchPhotosApi(key, query).then((array) => {
        setArrayQuery(array);
      });
    }
  }, [key, query]);
  return arrayQuery;
}

export default useSearchPhotos;

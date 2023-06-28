import { useState, useEffect } from 'react';
import SearchPhotosApi from './searchPhoto-api';

function useSearchPhotos({ key, query }) {
  const [arrayQuery, setArrayQuery] = useState([]);
  useEffect(() => {
    if (query?.length > 2) {
      SearchPhotosApi(key, query).then((array) => {
        setArrayQuery(array);
      });
    }
  }, [key, query]);
  return arrayQuery;
}

export default useSearchPhotos;

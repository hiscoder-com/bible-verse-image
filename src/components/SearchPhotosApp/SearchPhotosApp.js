import React, { useEffect, useState } from 'react';
import useSearchPhotos from '../useSearchPhotos/useSearchPhotos';
import UNSPLASH_KEY from '../../utils/unSplashKey.js';

export default function SearchPhotosApp({ handleChangeUrl, styleClassComponets }) {
  const [query, setQuery] = useState('');
  const [input, setInput] = useState('');
  const [pics, setPics] = useState([]);
  const [img, setImg] = useState({});

  const { arrayQuery, queryUse } = useSearchPhotos({
    key: UNSPLASH_KEY,
    query: query,
  });

  useEffect(() => {
    if (img.id) {
      handleChangeUrl(img.urls.full);
    }
  }, [img.id]);

  useEffect(() => {
    if (arrayQuery.length) {
      setPics(arrayQuery);
    }
  }, [queryUse]);

  const searchPhotos = (e) => {
    e.preventDefault();
    setQuery(input);
  };

  return (
    <>
      <form onSubmit={searchPhotos}>
        <label className={styleClassComponets.labelStyle} htmlFor="query">
          📷
        </label>
        <input
          type="text"
          name="query"
          className={styleClassComponets.inputStyle}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className={styleClassComponets.buttonStyle}>
          Search
        </button>
      </form>
      <div className={styleClassComponets.cardLisStyle}>
        {pics.map((pic) => (
          <div
            className={`${styleClassComponets.cardStyle}${
              pic.id === img.id ? ` ${styleClassComponets.cardCurrentStyle}` : ''
            }`}
            key={pic.id}
          >
            <img
              className={styleClassComponets.cardImageStyle}
              alt={pic.alt_description}
              src={pic.urls.full}
              width="50%"
              height="50%"
              onClick={() => {
                setImg(pic);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}

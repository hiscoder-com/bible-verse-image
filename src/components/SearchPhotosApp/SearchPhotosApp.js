import React, { useEffect, useState } from 'react';
import useSearchPhotos from '../useSearchPhotos/useSearchPhotos';

export default function SearchPhotosApp({ handleChangeUrl }) {
  const [query, setQuery] = useState('');
  const [input, setInput] = useState('');
  const [pics, setPics] = useState([]);
  const [img, setImg] = useState({});

  const { arrayQuery, queryUse } = useSearchPhotos({
    key: 'v72jwXBy3QD0RDOkyHAaV2t43JP-Z2IkzA1hBwVf-4M',
    query: query,
  });

  useEffect(() => {
    if (img.id) {
      handleChangeUrl(img.urls.full);
    }
  }, [img.id]);

  useEffect(() => {
    console.log(arrayQuery);
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
      <form className="form" onSubmit={searchPhotos}>
        <label className="label" htmlFor="query">
          📷
        </label>
        <input
          type="text"
          name="query"
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div className="card-list">
        {pics.map((pic) => (
          <div
            className={`card${pic.id === img.id ? ' current-image' : ''}`}
            key={pic.id}
          >
            <img
              className="card-image"
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

import React, { useEffect, useState } from 'react';
import useSearchPhotos from '../useSearchPhotos/useSearchPhotos';

const button = {
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  color: 'white',
  padding: '1rem 2rem',
  border: '1px solid rgba(0, 0, 0, 0.75)',
  borderRadius: '20px',
  fontSize: '1.4rem',
  cursor: 'pointer',
  transition: 'background-color 250ms',
};

const inputSearch = {
  fontSize: '1.6rem',
  padding: '0.5rem 2rem',
  lineHeight: '2.8rem',
  borderRadius: '20px',
  backgroundColor: 'white',
  marginBottom: '1rem',
};

const label = {
  fontSize: '3rem',
  marginBottom: '1rem',
};

const card = {
  marginBottom: '1rem',
  display: 'flex',
};

const cardImage = {
  flex: '100%',
  marginTop: '1rem',
  borderRadius: '10px',
};

const cardList = {
  columnCount: '2',
};

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
        <label className="label" htmlFor="query" style={label}>
          📷
        </label>
        <input
          type="text"
          name="query"
          className="input"
          style={inputSearch}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="button" style={button}>
          Search
        </button>
      </form>
      <div className="card-list" style={cardList}>
        {pics.map((pic) => (
          <div
            className={`card${pic.id === img.id ? ' current-image' : ''}`}
            style={card}
            key={pic.id}
          >
            <img
              className="card--image"
              style={cardImage}
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

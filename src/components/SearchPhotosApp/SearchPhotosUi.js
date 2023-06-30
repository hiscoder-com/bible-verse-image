import React, { useState } from 'react';

import searchPhotosApi from '../useSearchPhotos/searchPhotosApi';

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

const input = {
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

export default function SearchPhotosUi({ handleChangeUrl }) {
  const [query, setQuery] = useState('God');
  const [pics, setPics] = useState([]);
  const [url, setUrl] = useState('');

  let obj = {
    key: 'v72jwXBy3QD0RDOkyHAaV2t43JP-Z2IkzA1hBwVf-4M',
    query: query,
  };

  function setUrlAll(url) {
    setUrl(url);
    handleChangeUrl(url);
  }

  const searchPhotos = async (e) => {
    e.preventDefault();

    const arrayQuery = await searchPhotosApi(obj.key, obj.query);
    setPics(arrayQuery);
  };

  return (
    <>
      <form className="form" onSubmit={searchPhotos}>
        {' '}
        <label className="label" htmlFor="query" style={label}>
          {' '}
          📷
        </label>
        <input
          type="text"
          name="query"
          className="input"
          style={input}
          placeholder={query}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button" style={button}>
          Search
        </button>
      </form>
      <div>
        <h4>{`Полученный URL:${url}`}</h4>
      </div>
      <div className="card-list" style={cardList}>
        {pics.map((pic) => (
          <div className="card" style={card} key={pic.id}>
            <img
              id="imageId"
              className="card--image"
              style={cardImage}
              alt={pic.alt_description}
              src={pic.urls.full}
              width="50%"
              height="50%"
            />
            <script>imageId.onclick = function() {setUrlAll(pic.urls.full)};</script>
          </div>
        ))}{' '}
      </div>
    </>
  );
}

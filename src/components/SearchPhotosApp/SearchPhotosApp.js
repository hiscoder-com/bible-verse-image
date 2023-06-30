import React, { useState } from 'react';
import SearchPhotosUi from './SearchPhotosUi';

const appAll = {
  margin: 0,
  padding: 0,
};

const container = {
  margin: '0 auto',
  maxWwidth: '1000px',
  padding: '40px',
};

const title = {
  fontSize: '4.4rem',
  fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
};

function SearchPhotosApp() {
  const [url, setUrl] = useState('');
  const handleChangeUrl = (value) => {
    setUrl(value);
  };
  return (
    <div className="App" style={appAll}>
      <div className="container" style={container}>
        <h1 className="title" style={title}>
          {'React Photo Search'}
        </h1>
        <div className="main">
          <SearchPhotosUi handleChangeUrl={handleChangeUrl} />
          <div> URL: {url}</div>
        </div>
      </div>
    </div>
  );
}
export default SearchPhotosApp;

### Default example

```jsx
import React, { useState } from 'react';
import SearchPhotosApp from './SearchPhotosApp';

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

function Component() {
  const [url, setUrl] = useState('');
  return (
    <div className="App" style={appAll}>
      <div className="container" style={container}>
        <h1 className="title" style={title}>
          {'React Photo Search'}
        </h1>
        <div className="main">
          <SearchPhotosApp handleChangeUrl={setUrl} />
          <div> URL: {url}</div>
        </div>
      </div>
    </div>
  );
}
<Component />;
```

### Default example

Для стилизации компонента подключен файл SearchPhotosApp.css из каталога mock

```jsx
import React, { useState } from 'react';
import SearchPhotosApp from './SearchPhotosApp';
import './mock/SearchPhotosApp.css';

function Component() {
  const [url, setUrl] = useState('');
  return (
    <div className="App">
      <div className="container">
        <h1 className="title">{'React Photo Search'}</h1>
        <h6 className="url">{`Current URL: ${url}`}</h6>
        <div className="main">
          <SearchPhotosApp handleChangeUrl={setUrl} />
        </div>
      </div>
    </div>
  );
}
<Component />;
```

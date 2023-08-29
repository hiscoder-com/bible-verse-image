##### Default example

Для стилизации компонента подключен tailwindcss
Необходимо стилизовать следующие классы компонента:

- labelStyle
- inputStyle
- buttonStyle
- cardStyle
- cardImageStyle
- cardCurrentStyle
- cardLisStyle

```jsx
import React, { useState } from 'react';
import { SearchPhotosApp } from '@texttree/bible-verse-image';

const styleClass = {
  appStyle: 'm-0 p-0',
  containerStyle: 'mx-0 max-w-screen-lg p-10',
  titleStyle: 'text-7xl font-mono text-rose-700',
  urlStyle: 'text-1xl font-mono border-dashed border-black',
  mainStyle: '',
};

const styleClassComponets = {
  labelStyle: 'text-5xl mb-4',
  inputStyle: 'text-3xl px-2 leading-10 rounded-2xl bg-white mb-4',
  buttonStyle:
    'bg-slate-950 text-white pr-6 pl-6  pb-3 pt-3 border-black border-solid rounded-3xl text-2xl cursor-pointer transition hover:bg-stone-900',
  cardStyle: 'mb-4 flex w-6/12 h-3/6',
  cardImageStyle: 'flex-1 rounded-xl',
  cardCurrentStyle: 'rounded-xl  border-y-4 border-solid border-indigo-500',
  cardLisStyle: 'columns-3',
};

function Component() {
  const [url, setUrl] = useState('');
  return (
    <div className={styleClass.appStyle}>
      <div className={styleClass.containerStyle}>
        <h1 className={styleClass.titleStyle}>{'React Photo Search'}</h1>
        <h6 className={styleClass.urlStyle}>{`Current URL: ${url}`}</h6>
        <div className={styleClass.mainStyle}>
          <SearchPhotosApp
            handleChangeUrl={setUrl}
            styleClassComponets={styleClassComponets}
          />
        </div>
      </div>
    </div>
  );
}
<Component />;
```

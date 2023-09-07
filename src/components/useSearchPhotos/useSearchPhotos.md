##### Default example

```jsx
import React, { useState, useEffect } from 'react';

import { useSearchPhotos, Canvas } from '@texttree/bible-verse-image';
import UNSPLASH_KEY from '../../utils/unSplashKey.js';

const { arrayQuery, queryUse } = useSearchPhotos({
  key: UNSPLASH_KEY,
  query: 'dog',
});

const [image, setImage] = useState({});

useEffect(() => {
  if (arrayQuery.length >= 4) {
    const image = {
      srcimage: arrayQuery[2].urls.full,
    };
    setImage(image);
  }
}, [arrayQuery]);

const infocanvas = {
  height: 900,
  width: 900,
};

const elements = [
  {
    type: 'background',
    url: image.srcimage,
    props: {},
  },
  {
    type: 'image',
    url: 'https://raw.githubusercontent.com/texttree/bible-verse-image/master/images/vcana-logo.svg',
    props: {
      zoom: 0.5,
    },
  },
  {
    type: 'text',
    x: 225,
    y: 225,
    text: 'Привет!',
    props: {
      fillStyle: 'blue',
      fontStyle: 'normal',
      fontSize: 120,
      font: 'Helvetica, Arial, sans-serif',
      alignment: 'center',
      blockWidth: 450,
      lineHeight: 144,
    },
  },
];

function Component() {
  return (
    <Canvas
      infocanvas={infocanvas}
      backgroundimage={image}
      elements={elements}
      className={'w-full'}
    />
  );
}

Component();
```

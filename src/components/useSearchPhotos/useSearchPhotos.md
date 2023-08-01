### Default example

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
      srcimage: arrayQuery[4].urls.full,
      // zoom: 0.6,
      // offsetX: 100,
      // offsetY: 80,
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
    type: 'image',
    x: 50,
    y: 50,
    props: {
      url: 'https://raw.githubusercontent.com/texttree/bible-verse-image/master/images/vcana-logo.svg',
      zoom: 0.5,
    },
  },
  {
    type: 'text',
    x: 225,
    y: 225,
    props: {
      text: 'God is love',
      fillStyle: 'blue',
      fontStyle: 'small-caps',
      fontSize: 120,
      font: 'Helvetica, Arial, sans-serif',
      alignment: 'center',
      blockWidth: 450,
      lineHeight: 144,
    },
  },

  {
    type: 'text',
    x: 225,
    y: 565,
    props: {
      text: '1 Jon 4:8',
      fillStyle: 'blue',
      fontStyle: 'small-caps',
      fontSize: 40,
      font: 'Helvetica, Arial, sans-serif',
      alignment: 'center',
      blockWidth: 450,
    },
  },

  {
    type: 'text',
    x: 225,
    y: 750,
    props: {
      text: 'ESV',
      fillStyle: 'blue',
      fontStyle: 'small-caps',
      fontSize: 80,
      font: 'Helvetica, Arial, sans-serif',
      alignment: 'center',
      blockWidth: 450,
    },
  },
];

function Component() {
  return (
    <Canvas
      organization="OBT"
      infocanvas={infocanvas}
      backgroundimage={image}
      elements={elements}
      className={'w-full'}
    />
  );
}

Component();
```

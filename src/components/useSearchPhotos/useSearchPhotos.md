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
      height: 1200,
      width: 1200,
    };
    setImage(image);
  }
}, [arrayQuery]);

const infocanvas = {
  height: 1200,
  width: 1200,
};

const textStyles = [
  {
    type: 'text',
    x: 70,
    y: 70,
    props: {
      text: 'OBT',
      fillStyle: 'white',
      font: 'small-caps 30px Helvetica, Arial, sans-serif',
      textAlign: 'center',
      url: '',
    },
  },
  {
    type: 'text',
    x: 600,
    y: 550,
    props: {
      text: 'God is love',
      fillStyle: 'white',
      font: 'small-caps 120px Helvetica, Arial, sans-serif',
      textAlign: 'center',
      url: '',
    },
  },

  {
    type: 'text',
    x: 600,
    y: 650,
    props: {
      text: '1 Jon 4:8',
      fillStyle: 'white',
      font: 'small-caps 40px Helvetica, Arial, sans-serif',
      textAlign: 'center',
    },
  },

  {
    type: 'text',
    x: 600,
    y: 1150,
    props: {
      text: 'ESV',
      fillStyle: 'white',
      font: 'small-caps 120px Helvetica, Arial, sans-serif',
      textAlign: 'center',
    },
  },
];

function Component() {
  return (
    <Canvas
      organization="OBT"
      infocanvas={infocanvas}
      infoimage={image}
      textStyles={textStyles}
      className={'w-full'}
    />
  );
}

Component();
```

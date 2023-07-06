### Default example

```jsx
import React from 'react';

import { useSearchPhotos, Canvas } from '@texttree/bible-verse-image';
import UNSPLASH_KEY from '../../utils/unSplashKey.js';

const { arrayQuery, queryUse } = useSearchPhotos({
  key: UNSPLASH_KEY,
  query: 'black',
});

let srcI;
if (arrayQuery.length) {
  srcI = arrayQuery[4].urls.full;
}

const infoimage = {
  srcimage: srcI,
  sizeimage: '1200',
};

const textStyles = [
  {
    text: 'OBT',
    x: 70,
    y: 70,
    fillStyle: 'blue',
    font: 'small-caps 30px Helvetica, Arial, sans-serif',
    textAlign: 'center',
  },
  {
    text: 'God is love',
    x: 600,
    y: 550,
    fillStyle: 'blue',
    font: 'small-caps 120px Helvetica, Arial, sans-serif',
    textAlign: 'center',
  },

  {
    text: '1 Jon 4:8',
    x: 550,
    y: 650,
    fillStyle: 'blue',
    font: 'small-caps 40px Helvetica, Arial, sans-serif',
    textAlign: 'center',
  },

  {
    text: 'ESV',
    x: 600,
    y: 1150,
    fillStyle: 'blue',
    font: 'small-caps 120px Helvetica, Arial, sans-serif',
    textAlign: 'center',
  },
];

function Component() {
  return <Canvas organization="OBT" infoimage={infoimage} textStyles={textStyles} />;
}

Component();
```

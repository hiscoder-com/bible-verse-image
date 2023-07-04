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
function Component() {
  return (
    <Canvas
      organization="OBT"
      bibletext="God is love"
      reftext="1 Jon 4:8"
      nametranslate="ESV"
      srcimage={srcI}
    />
  );
}

Component();
```

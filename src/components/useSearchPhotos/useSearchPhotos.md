### Default example

```jsx
import React from 'react';

import { useSearchPhotos, Canvas } from '@texttree/bible-verse-image';

let obj = {
  key: process.env.UNSPLASH_KEY,
  query: 'black',
};

const arrayQuery = useSearchPhotos(obj);
let srcI;
if (arrayQuery.length) {
  srcI = arrayQuery[4];
  srcI = srcI.urls.full;
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

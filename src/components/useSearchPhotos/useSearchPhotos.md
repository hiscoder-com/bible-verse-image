### Default example

```jsx
import React from 'react';

import { useSearchPhotos, Canvas } from '@texttree/bible-verse-image';

let obj = {
  key: 'v72jwXBy3QD0RDOkyHAaV2t43JP-Z2IkzA1hBwVf-4M',
  query: 'black',
};

const arrayQuery = useSearchPhotos(obj);
let srcI;
if (arrayQuery.length) {
  srcI = arrayQuery[0];
  srcI = srcI.urls.full;
}
let i = 0;
function Component() {
  i++;
  console.log(i);
  return (
    <Canvas
      organization="OBT"
      bibleText="God is love"
      refText="1 Jon 4:8"
      nameTranslate="ESV"
      srcImage={srcI}
    />
  );
}

Component();
```

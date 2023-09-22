##### This is an example of the complex use of various elements on one canvas

```jsx
import React from 'react';

import { Canvas } from '@texttree/bible-verse-image';
const infocanvas = {
  height: 1600,
  width: 1600,
};

const elements = [
  {
    type: 'background',
    url: 'https://unsplash.com/photos/V4sIHm-OSDk/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjk0NTUwNjc3fA&force=true&w=1920',
    props: {
      zoom: 1.2,
      offsetX: 0,
      offsetY: -310,
      filter: 'opacity(.9)',
    },
  },
  {
    type: 'rectangle',
    x: 120,
    y: 120,
    width: 1360,
    height: 1360,
    props: {
      fillColor: '#0000',
      strokeColor: 'black',
      strokeWidth: 10,
    },
  },
  {
    type: 'rectangle',
    x: 160,
    y: 160,
    width: 1280,
    height: 1280,
    props: {
      fillColor: '#0000',
      strokeColor: 'black',
      strokeWidth: 4,
    },
  },
  {
    type: 'rectangle',
    x: 380,
    y: 560,
    width: 840,
    height: 180,
    props: {
      fillColor: '#0002',
      strokeColor: '#0002',
    },
  },
  {
    type: 'rectangle',
    x: 580,
    y: 1260,
    width: 440,
    height: 100,
    props: {
      fillColor: '#0002',
      strokeColor: '#0002',
    },
  },
  {
    type: 'text',
    x: 0,
    y: 420,
    text: 'Be still,',
    props: {
      fillStyle: '#204675',
      fontStyle: 'normal',
      fontSize: 220,
      font: 'Helvetica, Arial, sans-serif',
      alignment: 'center',
      blockWidth: 1600,
    },
  },
  {
    type: 'text',
    x: 0,
    y: 690,
    text: 'and know that',
    props: {
      fillStyle: '#204675',
      fontStyle: 'normal',
      fontSize: 126,
      font: 'Helvetica, Arial, sans-serif',
      alignment: 'center',
      blockWidth: 1600,
    },
  },
  {
    type: 'text',
    x: 0,
    y: 960,
    text: 'I am God',
    props: {
      fillStyle: '#204675',
      fontStyle: 'normal',
      fontSize: 220,
      font: 'Helvetica, Arial, sans-serif',
      alignment: 'center',
      blockWidth: 1600,
    },
  },
  {
    type: 'text',
    x: 0,
    y: 1330,
    text: 'PSALM 46:10',
    props: {
      fillStyle: '#fffc',
      fontStyle: 'normal',
      fontSize: 50,
      font: 'Helvetica, Arial, sans-serif',
      alignment: 'center',
      blockWidth: 1600,
    },
  },
];

<div className="flex flex-row">
  <Canvas infocanvas={infocanvas} elements={elements} className={'w-1/2 border'} />
  <img src="/ex1.jpg" alt="Example1" className={'w-1/2'} />
</div>;
```

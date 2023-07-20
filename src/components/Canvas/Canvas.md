### Default example

```jsx
import React from 'react';

import { Canvas } from '@texttree/bible-verse-image';
const infocanvas = {
  height: 900,
  width: 900,
};

const infoimage = {
  srcimage:
    'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NjQwOTl8MHwxfHNlYXJjaHwxfHx3aGl0ZXxlbnwwfHx8fDE2ODczNDczNTZ8MA&ixlib=rb-4.0.3&q=80&w=1200',
  // 'https://img.freepik.com/free-photo/a-cupcake-with-a-strawberry-on-top-and-a-strawberry-on-the-top_1340-35087.jpg',
  // zoom: 1,
  // offsetX: 100,
  // offsetY: 0,
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
      fontSize: '120px',
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
      fontSize: '40px',
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
      fontSize: '80px',
      font: 'Helvetica, Arial, sans-serif',
      alignment: 'center',
      blockWidth: 450,
    },
  },
];

<Canvas
  organization="OBT"
  infocanvas={infocanvas}
  infoimage={infoimage}
  elements={elements}
  className={'w-full'}
/>;
```

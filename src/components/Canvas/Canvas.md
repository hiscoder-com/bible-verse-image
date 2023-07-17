### Default example

```jsx
import React from 'react';

import { Canvas } from '@texttree/bible-verse-image';
const infocanvas = {
  height: 1200,
  width: 1200,
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
    x: 600,
    y: 550,
    props: {
      text: 'God is love',
      fillStyle: 'blue',
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
      fillStyle: 'blue',
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
      fillStyle: 'blue',
      font: 'small-caps 120px Helvetica, Arial, sans-serif',
      textAlign: 'center',
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

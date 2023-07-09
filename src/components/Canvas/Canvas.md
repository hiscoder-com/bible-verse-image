### Default example

```jsx
import React from 'react';

import { Canvas } from '@texttree/bible-verse-image';

const infoimage = {
  srcimage:
    'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NjQwOTl8MHwxfHNlYXJjaHwxfHx3aGl0ZXxlbnwwfHx8fDE2ODczNDczNTZ8MA&ixlib=rb-4.0.3&q=80&w=1200',
  height: 1200,
  width: 1200,
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
    x: 600,
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

<Canvas
  organization="OBT"
  infoimage={infoimage}
  textStyles={textStyles}
  className={'w-full'}
/>;
```

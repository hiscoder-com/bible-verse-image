##### This is an example of the complex use of various elements on one canvas

```jsx
import React from 'react';

import { Canvas } from '@texttree/bible-verse-image';
const infocanvas = {
  height: 900,
  width: 900,
};

const elements = [
  {
    type: 'background',
    x: 0,
    y: 0,
    url: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NjQwOTl8MHwxfHNlYXJjaHwxfHx3aGl0ZXxlbnwwfHx8fDE2ODczNDczNTZ8MA&ixlib=rb-4.0.3&q=80&w=1200',
    props: {},
  },

  {
    type: 'image',
    x: 50,
    y: 50,
    url: 'https://raw.githubusercontent.com/texttree/bible-verse-image/master/images/vcana-logo.svg',
    props: {
      zoom: 0.5,
    },
  },
  {
    type: 'text',
    x: 225,
    y: 225,
    text: 'God is <selected font="Arial" textColor ="white" backgroundColor = "red">love</selected> and <selected font="Arial" textColor ="white" backgroundColor = "green">joy </selected>',
    props: {
      fillStyle: 'blue',
      fontStyle: 'normal',
      fontSize: 90,
      font: 'Helvetica, Arial, sans-serif',
      alignment: 'center',
      blockWidth: 450,
      lineHeight: 144,
    },
  },
  {
    type: 'text',
    x: 225,
    y: 595,
    text: '1 Jon 4:8',
    props: {
      fillStyle: 'blue',
      fontStyle: 'normal',
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
    text: 'ESV',
    props: {
      fillStyle: 'blue',
      fontStyle: 'normal',
      fontSize: 80,
      font: 'Helvetica, Arial, sans-serif',
      alignment: 'center',
      blockWidth: 450,
    },
  },
];

<Canvas infocanvas={infocanvas} elements={elements} className={'w-full'} />;
```

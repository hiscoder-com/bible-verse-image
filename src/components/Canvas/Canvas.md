### Default example

```jsx
import React from 'react';

import { Canvas } from '@texttree/bible-verse-image';
const infocanvas = {
  height: 900,
  width: 900,
};

const backgroundimage = {
  srcimage:
    'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NjQwOTl8MHwxfHNlYXJjaHwxfHx3aGl0ZXxlbnwwfHx8fDE2ODczNDczNTZ8MA&ixlib=rb-4.0.3&q=80&w=1200',
  // 'https://img.freepik.com/free-photo/a-cupcake-with-a-strawberry-on-top-and-a-strawberry-on-the-top_1340-35087.jpg',
  // zoom: 1,
  // offsetX: 100,
  // offsetY: 0,
};

const elements = [
  {
    type: 'background',
    x: 0,
    y: 0,
    props: {
      url: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NjQwOTl8MHwxfHNlYXJjaHwxfHx3aGl0ZXxlbnwwfHx8fDE2ODczNDczNTZ8MA&ixlib=rb-4.0.3&q=80&w=1200',
      width: infocanvas.width,
      height: infocanvas.height,
      // zoom: 2,
      // offsetX: 100,
      // offsetY: 0,
    },
  },
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
      fontSize: 120,
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
    props: {
      text: 'ESV',
      fillStyle: 'blue',
      fontStyle: 'small-caps',
      fontSize: 80,
      font: 'Helvetica, Arial, sans-serif',
      alignment: 'center',
      blockWidth: 450,
    },
  },
];

<Canvas
  organization="OBT"
  infocanvas={infocanvas}
  backgroundimage={backgroundimage}
  elements={elements}
  className={'w-full'}
/>;
```

### This is an example that allows you to select a background image from the file system

```jsx
import React, { useState, useEffect } from 'react';
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
    props: {
      url: '',
      width: infocanvas.width,
      height: infocanvas.height,
    },
  },
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
      fontSize: 120,
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
    props: {
      text: 'ESV',
      fillStyle: 'blue',
      fontStyle: 'small-caps',
      fontSize: 80,
      font: 'Helvetica, Arial, sans-serif',
      alignment: 'center',
      blockWidth: 450,
    },
  },
];

const CanvasWithBackground = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [count, setCount] = useState(0);
  const [elementsWithBackground, setElementsWithBackground] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (backgroundImage && elements.length > 0) {
      const updatedElements = [...elements];
      updatedElements[0] = {
        ...updatedElements[0],
        props: { ...updatedElements[0].props, url: backgroundImage },
      };
      setElementsWithBackground(updatedElements);
    } else {
      setElementsWithBackground(elements);
    }
  }, [backgroundImage, elements]);

  return (
    <div className={'p-4 border border-gray-400 rounded-md shadow-md'}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {backgroundImage ? (
        <>
          <Canvas
            organization="OBT"
            infocanvas={infocanvas}
            elements={elementsWithBackground}
            className={'w-full'}
          />
          <p>Количество: {count}</p>
          <button onClick={handleIncrement}>Увеличить</button>
        </>
      ) : (
        <p className={'text-red-500'}>Пожалуйста, выберите изображение для фона</p>
      )}
    </div>
  );
};

<CanvasWithBackground />;
```

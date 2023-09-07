##### Draw background

To set a background image on the canvas, you need include an object in the `elements` array with the following properties:

- `type` (_string, required_): Specifies the type of the element. In this case, it should be set to `'background'`.
- `url` (_string, required_): The URL of the image to be used as the background.

- `props` (_object, required_): An object containing properties for configuring the background image.
- `zoom` (_number_, default: 1): The zoom factor to scale the background image.
- `offsetX` (_number_,default: 0): The horizontal offset of the background image.
- `offsetY` (_number_, default: 0): The vertical offset of the background image.

By default, the background will be drawn starting from the upper left corner.

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
    url: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NjQwOTl8MHwxfHNlYXJjaHwxfHx3aGl0ZXxlbnwwfHx8fDE2ODczNDczNTZ8MA&ixlib=rb-4.0.3&q=80&w=1200',
    props: {},
  },
];

<Canvas infocanvas={infocanvas} elements={elements} className={'w-full'} />;
```

##### This is an example that allows you to select a background image from the file system

```jsx
import React, { useState, useEffect } from 'react';
import { Canvas } from '@texttree/bible-verse-image';

const infocanvas = {
  height: 900,
  width: 900,
};

const initialBackgroundElement = {
  type: 'background',
  url: '',
  props: {},
};

const CanvasWithBackground = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [elementsWithBackground, setElementsWithBackground] = useState([
    initialBackgroundElement,
  ]);

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

  useEffect(() => {
    if (backgroundImage) {
      setElementsWithBackground((prevElements) => {
        const updatedElements = [...prevElements];
        updatedElements[0] = {
          ...updatedElements[0],
          url: backgroundImage,
        };
        return updatedElements;
      });
    } else {
      setElementsWithBackground([initialBackgroundElement]);
    }
  }, [backgroundImage]);

  return (
    <div className={'p-4 border border-gray-400 rounded-md shadow-md'}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {backgroundImage ? (
        <Canvas
          organization="OBT"
          infocanvas={infocanvas}
          elements={elementsWithBackground}
          className={'w-full'}
        />
      ) : (
        <p className={'text-red-500'}>Please select an image for the background</p>
      )}
    </div>
  );
};

<CanvasWithBackground />;
```

##### Draw image

To display an image on the canvas, you need include an object in the `elements` array with the following properties:

- `type` (_string, required_): Specifies the type of the element. In this case, it should be set to `'image'`.
- `url` (_string, required_): The URL of the image to be displayed.

- `props` (_object, required_): An object containing properties for configuring the image element.
- `zoom` (_number_, default: 1): The zoom factor to scale the image.
- `offsetX` (_number_,default: 0): The horizontal offset of the image.
- `offsetY` (_number_, default: 0): The vertical offset of the image.

By default, the image will be drawn starting from the upper left corner.

```jsx
import React from 'react';

import { Canvas } from '@texttree/bible-verse-image';
const infocanvas = {
  height: 900,
  width: 900,
};

const elements = [
  {
    type: 'image',
    url: 'https://raw.githubusercontent.com/texttree/bible-verse-image/master/images/vcana-logo.svg',
    props: {
      zoom: 0.5,
      offsetX: 0,
      offsetY: 0,
    },
  },
];

<Canvas
  organization="OBT"
  infocanvas={infocanvas}
  elements={elements}
  className={'w-full'}
/>;
```

##### Draw background

To set a background image on the canvas, you need include an object in the `elements` array with the following properties:

- `type` (_string, required_): Specifies the type of the element. In this case, it should be set to `'background'`.
- `url` (_string, required_): The URL of the image to be used as the background.

- `props` (_object, required_): An object containing properties for configuring the background image.

  - `zoom` (_number_, default: 1): The zoom factor to scale the background image.
  - `offsetX` (_number_,default: 0): The horizontal offset of the background image.
  - `offsetY` (_number_, default: 0): The vertical offset of the background image.
  - `filter` (_string_, default: none): The filter property accepts a value of "none" or one or more of the following filter functions in a string. You can use standard filter values, for example opacity(0.3), blur(10px), contrast(120%)

  See more information: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter

By default, the background will be drawn starting from the upper left corner.

```jsx
import React from 'react';

import { Canvas } from '@texttree/bible-verse-image';
const infocanvas = {
  height: 250,
  width: 250,
};

const elements = [
  {
    type: 'background',
    url: 'https://images.unsplash.com/photo-1546587348-d12660c30c50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=80&w=1200',
    props: {
      zoom: 2,
      offsetX: -10,
      offsetY: 0,
      filter: 'sepia(1)',
    },
  },
];

<Canvas infocanvas={infocanvas} elements={elements} className={'border'} />;
```

##### This is an example that allows you to select a background image from the file system

```jsx
import React, { useState, useEffect } from 'react';
import { Canvas } from '@texttree/bible-verse-image';

const infocanvas = {
  height: 250,
  width: 250,
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
          className={'border'}
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
  - `filter` (_string_, default: none): The filter property accepts a value of "none" or one or more of the following filter functions in a string. You can use standard filter values, for example opacity(0.3), blur(10px), contrast(120%)

  See more information: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter

By default, the image will be drawn starting from the upper left corner.

```jsx
import React from 'react';

import { Canvas } from '@texttree/bible-verse-image';
const infocanvas = {
  height: 250,
  width: 250,
};

const elements = [
  {
    type: 'image',
    url: 'https://raw.githubusercontent.com/texttree/bible-verse-image/master/images/vcana-logo.svg',
    props: {
      zoom: 0.125,
      offsetX: 0,
      offsetY: 0,
      filter: 'blur(1px)',
    },
  },
];

<Canvas
  organization="OBT"
  infocanvas={infocanvas}
  elements={elements}
  className={'border'}
/>;
```

##### Applying multiple filters

You can combine as many filters as you like using spaces between filters. In this example, brightness, contrast, and shadow casting filters are applied to a dog photo.

```jsx
import React from 'react';

import { Canvas } from '@texttree/bible-verse-image';
const infocanvas = {
  height: 250,
  width: 250,
};

const elements = [
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1694191864312-ab0171f598c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    props: {
      zoom: 0.15,
      offsetX: 0,
      offsetY: 0,
      filter: 'brightness(90%) contrast(1.4) drop-shadow(-9px 9px 3px #e81)',
    },
  },
];

<Canvas
  organization="OBT"
  infocanvas={infocanvas}
  elements={elements}
  className={'border'}
/>;
```

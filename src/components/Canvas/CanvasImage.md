##### Draw background

To set a background image on the canvas, you need include an object in the `elements` array with the following properties:

- `type` (_string, required_): Specifies the type of the element. In this case, it should be set to `'background'`.
- `url` (_string, required_): The URL of the image to be used as the background.

- `props` (_object, required_): An object containing properties for configuring the background image.
- `zoom` (_number_, default: 1): The zoom factor to scale the background image.
- `offsetX` (_number_,default: 0): The horizontal offset of the background image.
- `offsetY` (_number_, default: 0): The vertical offset of the background image.
- `filter` (_string_, default: none): The filter property accepts a value of "none" or one or more of the following filter functions in a string.
  - `url()`: Takes an IRI pointing to an SVG filter element, which may be embedded in an external XML file.
  - `blur()`: Applies a Gaussian blur to the drawing. It defines the value of the standard deviation to the Gaussian function, i.e., how many pixels on the screen blend into each other; thus, a larger value will create more blur. A value of 0 leaves the input unchanged.
  - `brightness()`: Applies a linear multiplier to the drawing, making it appear brighter or darker. A value under 100% darkens the image, while a value over 100% brightens it. A value of 0% will create an image that is completely black, while a value of 100% leaves the input unchanged.
  - `contrast()`: Adjusts the contrast of the drawing. A value of 0% will create a drawing that is completely black. A value of 100% leaves the drawing unchanged.
  - `drop-shadow()`:Applies a drop shadow effect to the drawing. A drop shadow is effectively a blurred, offset version of the drawing's alpha mask drawn in a particular color, composited below the drawing. This function takes up to five arguments:
  - `<offset-x>`: See `<length>` for possible units. Specifies the horizontal distance of the shadow.
  - `<offset-y>`:See `<length>` for possible units. Specifies the vertical distance of the shadow.
  - `<blur-radius>`: The larger this value, the bigger the blur, so the shadow becomes bigger and lighter. Negative values are not allowed.
  - `<color>`: See `<color>` values for possible keywords and notations.
  - `grayscale()`: Converts the drawing to grayscale. A value of 100% is completely grayscale. A value of 0% leaves the drawing unchanged.
  - `hue-rotate()`: Applies a hue rotate on the drawing. A value of 0deg leaves the input unchanged.
  - `invert()`: Inverts the drawing. A value of 100% means complete inversion. A value of 0% leaves the drawing unchanged.
  - `opacity()`: Applies transparency to the drawing. A value of 0% means completely transparent. A value of 100% leaves the drawing unchanged.
  - `saturate()`: Saturates the drawing. A value of 0% means completely un-saturated. A value of 100% leaves the drawing unchanged.
  - `sepia()`: Converts the drawing to sepia. A value of 100% means completely sepia. A value of 0% leaves the drawing unchanged.
    See more information: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter

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
    url: 'https://images.unsplash.com/photo-1546587348-d12660c30c50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=80&w=1200',
    props: {
      filter: 'sepia(1)',
    },
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
- `filter` (_string_, default: none): The filter property accepts a value of "none" or one or more of the following filter functions in a string.
  - `url()`: A CSS url(). Takes an IRI pointing to an SVG filter element, which may be embedded in an external XML file.
  - `blur()`: A CSS `<length>`. Applies a Gaussian blur to the drawing. It defines the value of the standard deviation to the Gaussian function, i.e., how many pixels on the screen blend into each other; thus, a larger value will create more blur. A value of 0 leaves the input unchanged.
  - `brightness()`: Applies a linear multiplier to the drawing, making it appear brighter or darker. A value under 100% darkens the image, while a value over 100% brightens it. A value of 0% will create an image that is completely black, while a value of 100% leaves the input unchanged.
  - `contrast()`: Adjusts the contrast of the drawing. A value of 0% will create a drawing that is completely black. A value of 100% leaves the drawing unchanged.
  - `drop-shadow()`: Applies a drop shadow effect to the drawing. A drop shadow is effectively a blurred, offset version of the drawing's alpha mask drawn in a particular color, composited below the drawing. This function takes up to five arguments:
  - `<offset-x>`: See `<length>` for possible units. Specifies the horizontal distance of the shadow.
  - `<offset-y>`: See `<length>` for possible units. Specifies the vertical distance of the shadow.
  - `<blur-radius>`: The larger this value, the bigger the blur, so the shadow becomes bigger and lighter. Negative values are not allowed.
  - `<color>`: See `<color>` values for possible keywords and notations.
  - `grayscale()`: Converts the drawing to grayscale. A value of 100% is completely grayscale. A value of 0% leaves the drawing unchanged.
  - `hue-rotate()`: Applies a hue rotate on the drawing. A value of 0deg leaves the input unchanged.
  - `invert()`: Inverts the drawing. A value of 100% means complete inversion. A value of 0% leaves the drawing unchanged.
  - `opacity()`: Applies transparency to the drawing. A value of 0% means completely transparent. A value of 100% leaves the drawing unchanged.
  - `saturate()`: Saturates the drawing. A value of 0% means completely un-saturated. A value of 100% leaves the drawing unchanged.
  - `sepia()`: Converts the drawing to sepia. A value of 100% means completely sepia. A value of 0% leaves the drawing unchanged.
    See more information: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter

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
      filter: 'blur(1px)',
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

##### Applying multiple filters

You can combine as many filters as you like using spaces between filters. In this example, brightness, contrast, and shadow casting filters are applied to a dog photo.

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
    url: 'https://images.unsplash.com/photo-1694191864312-ab0171f598c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    props: {
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
      filter: 'brightness(90%) contrast(1) drop-shadow(-9px 9px 3px #e81)',
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

##### Basic example draw text

The `elements` array contains objects representing the elements to be drawn on the canvas. To draw a basic text element, you need to define these properties:

- `type` (_string, required_): Specifies the type of the element. In this case, it should be set to `'text'`.
- `x` (_number, required_): The x-coordinate of the top-left corner of the text element.
- `y` (_number, required_): The y-coordinate of the top-left corner of the text element.
- `text` (_string, required_): The actual text content to be displayed.

- `props` (_object, required_): An object containing properties for configuring the text element.
- `fillStyle` (_string_, default: 'black'): The color of the text.
- `fontStyle` (_string_, default: 'normal'): The style of the font
- `fontSize` (_number_, default: 16): The size of the font in pixels.
- `font` (_string_, default: 'Helvetica, Arial, sans-serif'): The font family to be used for the text.
- `alignment` (_string_, default: 'left'): The alignment of the text
- `blockWidth` (_number_, default: 450): The maximum width of the text block. Text will wrap within this width.
- `lineHeight` (_number_, default: 1.2 \* fontSize): The height of each line of text.
- `letterSpacing`(_number_, default: 0): The letterSpacing specifies the spacing between letters when drawing text.This corresponds to the CSS letter-spacing. The default is 0px. The property can be used to get or set the spacing. The property value will remain unchanged if set to an invalid/unparsable value.
- `rotate`(_number_, default: 0): The rotate adds a rotation for elements. The default is 0 degree.
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
  - `hue-rotate()`: Applies a hue rotation on the drawing. A value of 0deg leaves the input unchanged.
  - `invert()`: Inverts the drawing. A value of 100% means complete inversion. A value of 0% leaves the drawing unchanged.
  - `opacity()`: Applies transparency to the drawing. A value of 0% means completely transparent. A value of 100% leaves the drawing unchanged.
  - `saturate()`: Saturates the drawing. A value of 0% means completely un-saturated. A value of 100% leaves the drawing unchanged.
  - `sepia()`: Converts the drawing to sepia. A value of 100% means completely sepia. A value of 0% leaves the drawing unchanged.

```jsx
import React from 'react';

import { Canvas } from '@texttree/bible-verse-image';
const infocanvas = {
  height: 900,
  width: 900,
};

const elements = [
  {
    type: 'text',
    x: 225,
    y: 225,
    text: 'love love ',
    props: {
      fillStyle: 'blue',
      fontStyle: 'normal',
      fontSize: 120,
      font: 'Helvetica, Arial, sans-serif',
      alignment: 'center',
      blockWidth: 450,
      lineHeight: 144,
    },
  },
];

<Canvas infocanvas={infocanvas} elements={elements} className={'w-full'} />;
```

##### Drawing selected text

The `elements` array contains objects representing the elements to be drawn on the canvas. In this example, a single text element with selected text styling is defined using the following properties:

- `type` (_string, required_): Specifies the type of the element. In this case, it should be set to `'text'`.
- `x` (_number, required_): The x-coordinate of the top-left corner of the text element.
- `y` (_number, required_): The y-coordinate of the top-left corner of the text element.
  - `text` (_string, required_): The text content with selected text markup to be displayed. The `<selected>` tag is used to apply styling to specific parts of the text.
- `props` (_object, required_): An object containing properties for configuring the text element.

  - `fillStyle` (_string_, default: 'black'): The color of the text.
  - `fontStyle` (_string_, default: 'normal'): The style of the font
  - `fontSize` (_number_, default: 16): The size of the font in pixels.
  - `font` (_string_, default: 'Helvetica, Arial, sans-serif'): The font family to be used for the text.
  - `alignment` (_string_, default: 'left'): The alignment of the text
  - `blockWidth` (_number_, default: 450): The maximum width of the text block. Text will wrap within this width.
  - `lineHeight` (_number_, default: 1.2 \* fontSize): The height of each line of text.

  The `<selected>` tag supports the following attributes to customize the styling of the enclosed text:

  - `font` (_string_, default: props.font): The font family to be used for the selected text.
  - `textColor` (_string_, default: props.fillStyle): The color of the selected text.
  - `backgroundColor` (_string_, default: 'white'): The background color behind the selected text.

```jsx
import React from 'react';

import { Canvas } from '@texttree/bible-verse-image';
const infocanvas = {
  height: 900,
  width: 900,
};

const elements = [
  {
    type: 'text',
    x: 225,
    y: 225,
    text: 'God is <selected font="Arial" textColor ="white" backgroundColor = "red">love</selected> ',
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
];

<Canvas infocanvas={infocanvas} elements={elements} className={'w-full'} />;
```

##### This example is drawing combinations of plain and highlighted text

```jsx
import React from 'react';

import { Canvas } from '@texttree/bible-verse-image';
const infocanvas = {
  height: 900,
  width: 900,
};

const elements = [
  {
    type: 'text',
    x: 225,
    y: 225,
    text: 'God is <selected font="Arial" textColor ="white" backgroundColor = "red">love</selected> and <selected font="Arial" textColor ="white" backgroundColor = "green">joy</selected>',
    props: {
      fillStyle: 'blue',
      fontStyle: 'small-caps',
      fontSize: 90,
      font: 'Helvetica, Arial, sans-serif',
      alignment: 'center',
      blockWidth: 450,
      lineHeight: 144,
    },
  },
];

<Canvas infocanvas={infocanvas} elements={elements} className={'w-full'} />;
```

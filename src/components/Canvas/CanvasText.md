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
  - `filter` (_string_, default: none): The filter property accepts a value of "none" or one or more of the following filter functions in a string. You can use standard filter values, for example opacity(0.3), blur(10px), contrast(120%)

  See more information: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter

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
      fillStyle: 'grey',
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

##### Draw text with a gradient fill

To draw a text with a linear gradient fill, you need to redefine the `fillStyle` property as an array with the following parameters:

- `x1, y1, x2, y2` (_object property_, default: `x1` are equal to the `x` coordinate, `y1` are equal to the `0` coordinate,`x2` are equal to the `x` coordinate, `y2` are equal to the `y + style.props.lineHeight` coordinate): The start and end points of the gradient line.

The gradient is formed from the breakpoints (from 0 to 1) and the name of the color. These properties are formed in an array of objects:

- `position` (_number,required_): The position of the stop point.
- `color` (_string, required_): The color of the stop point.

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
      fillStyle: [
        {},
        [
          { position: 0, color: 'red' },
          { position: 0.5, color: 'pink' },
          { position: 1, color: 'orange' },
        ],
      ],
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

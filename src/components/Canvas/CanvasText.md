### Basic example draw text

To use the component, these parameters must be initialized:

## `infocanvas` Object

The `infocanvas` object contains properties that define the dimensions and characteristics of the canvas where the text elements will be drawn.

- `height` (_number, required_): Specifies the height of the canvas in pixels.

- `width` (_number, required_): Specifies the width of the canvas in pixels.

## `elements` Array

The `elements` array contains objects representing the elements to be drawn on the canvas. To draw a basic text element, you need to define these properties:

- `type` (_string, required_): Specifies the type of the element. In this case, it should be set to `'text'`.
- `x` (_number, required_): The x-coordinate of the top-left corner of the text element.
- `y` (_number, required_): The y-coordinate of the top-left corner of the text element.
- `props` (_object, required_): An object containing properties for configuring the text element.
  - `text` (_string, required_): The actual text content to be displayed.
  - `fillStyle` (_string_): The color of the text.
  - `fontStyle` (_string_): The style of the font
  - `fontSize` (_number_): The size of the font in pixels.
  - `font` (_string_): The font family to be used for the text.
  - `alignment` (_string_): The alignment of the text
  - `blockWidth` (_number_): The maximum width of the text block. Text will wrap within this width.
  - `lineHeight` (_number_): The height of each line of text.

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
];

<Canvas infocanvas={infocanvas} elements={elements} className={'w-full'} />;
```

### Drawing selected text

## `infocanvas` Object

The `infocanvas` object contains properties that define the dimensions and characteristics of the canvas where the text elements will be drawn.

- `height` (_number, required_): Specifies the height of the canvas in pixels.

- `width` (_number, required_): Specifies the width of the canvas in pixels.

## `elements` Array

The `elements` array contains objects representing the elements to be drawn on the canvas. In this example, a single text element with selected text styling is defined using the following properties:

- `type` (_string, required_): Specifies the type of the element. In this case, it should be set to `'text'`.
- `x` (_number, required_): The x-coordinate of the top-left corner of the text element.
- `y` (_number, required_): The y-coordinate of the top-left corner of the text element.
- `props` (_object, required_): An object containing properties for configuring the text element.

  - `text` (_string, required_): The text content with selected text markup to be displayed. The `<selected>` tag is used to apply styling to specific parts of the text.

    The `<selected>` tag supports the following attributes to customize the styling of the enclosed text:

    - `font` (_string_): The font family to be used for the selected text.
    - `textColor` (_string_): The color of the selected text.
    - `backgroundColor` (_string_): The background color behind the selected text.

  - `fillStyle` (_string_): The color of the text.
  - `fontStyle` (_string_): The style of the font
  - `fontSize` (_number_): The size of the font in pixels.
  - `font` (_string_): The font family to be used for the text.
  - `alignment` (_string_): The alignment of the text
  - `blockWidth` (_number_): The maximum width of the text block. Text will wrap within this width.
  - `lineHeight` (_number_): The height of each line of text.

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
    props: {
      text: 'God is <selected font="Arial" textColor ="white" backgroundColor = "red">love <selected/>',
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

### This example is drawing combinations of plain and highlighted text

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
    props: {
      text: 'God is <selected font="Arial" textColor ="white" backgroundColor = "red">love <selected/> and <selected font="Arial" textColor ="white" backgroundColor = "green">joy <selected/>',
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
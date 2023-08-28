### Draw line

To use the component, these parameters must be initialized:

## `infocanvas` Object

The `infocanvas` object contains properties that define the dimensions and characteristics of the canvas where the text elements will be drawn.

- `height` (_number, required_): Specifies the height of the canvas in pixels.

- `width` (_number, required_): Specifies the width of the canvas in pixels.

## `elements` Array

To draw a line on the canvas, you can include an object in the `elements` array with the following properties:

- `type` (_string, required_): Specifies the type of the element. In this case, it should be set to `'line'`.

- `x1` (_number, required_): The x-coordinate of the starting point of the line.

- `y1` (_number, required_): The y-coordinate of the starting point of the line.

- `x2` (_number, required_): The x-coordinate of the ending point of the line.

- `y2` (_number, required_): The y-coordinate of the ending point of the line.

- `props` (_object, optional_): An object containing properties for configuring the line element.
  - `lineColor` (_string_): The color of the line.
  - `lineWidth` (_number_): The width of the line in pixels.

```jsx
import React from 'react';

import { Canvas } from '@texttree/bible-verse-image';
const infocanvas = {
  height: 900,
  width: 900,
};

const elements = [
  {
    type: 'line',
    x1: 110,
    y1: 140,
    x2: 500,
    y2: 600,
    props: {
      lineColor: 'red',
      lineWidth: 15,
    },
  },
];

<Canvas infocanvas={infocanvas} elements={elements} className={'w-full'} />;
```

### Draw rectangle

To use the component, these parameters must be initialized:

## `infocanvas` Object

The `infocanvas` object contains properties that define the dimensions and characteristics of the canvas where the text elements will be drawn.

- `height` (_number, required_): Specifies the height of the canvas in pixels.

- `width` (_number, required_): Specifies the width of the canvas in pixels.

## `elements` Array

To draw a rectangle on the canvas, you can include an object in the `elements` array with the following properties:

- `type` (_string, required_): Specifies the type of the element. In this case, it should be set to `'rectangle'`.

- `x` (_number, required_): The x-coordinate of the top-left corner of the rectangle.

- `y` (_number, required_): The y-coordinate of the top-left corner of the rectangle.

- `props` (_object, required_): An object containing properties for configuring the rectangle element.
  - `fillColor` (_string_): The fill color of the rectangle.
  - `width` (_number_): The width of the rectangle in pixels.
  - `height` (_number_): The height of the rectangle in pixels.
  - `strokeColor` (_string_): The stroke color of the rectangle's border.
  - `strokeWidth` (_number_): The width of the rectangle's border in pixels.

```jsx
import React from 'react';

import { Canvas } from '@texttree/bible-verse-image';
const infocanvas = {
  height: 900,
  width: 900,
};

const elements = [
  {
    type: 'rectangle',
    x: 300,
    y: 400,
    props: {
      fillColor: 'blue',
      width: 300,
      height: 450,
      strokeColor: 'black',
      strokeWidth: 2,
    },
  },
];

<Canvas infocanvas={infocanvas} elements={elements} className={'w-full'} />;
```

### Draw triangle

To use the component, these parameters must be initialized:

## `infocanvas` Object

The `infocanvas` object contains properties that define the dimensions and characteristics of the canvas where the text elements will be drawn.

- `height` (_number, required_): Specifies the height of the canvas in pixels.

- `width` (_number, required_): Specifies the width of the canvas in pixels.

## `elements` Array

To draw a triangle on the canvas, you can include an object in the `elements` array with the following properties:

- `type` (_string, required_): Specifies the type of the element. In this case, it should be set to `'triangle'`.

- `props` (_object, required_): An object containing properties for configuring the triangle element.
  - `vertex1` (_object, required_): An object specifying the coordinates of the first vertex of the triangle.
  - `vertex2` (_object, required_): An object specifying the coordinates of the second vertex of the triangle.
  - `vertex3` (_object, required_): An object specifying the coordinates of the third vertex of the triangle.
  - `fillColor` (_string_): The fill color of the triangle.
  - `strokeColor` (_string_): The stroke color of the triangle's border.
  - `strokeWidth` (_number_): The width of the triangle's border in pixels.

### Vertex Properties

Each vertex of the triangle is defined using the following properties:

- `x` (_number, required_): The x-coordinate of the vertex.
- `y` (_number, required_): The y-coordinate of the vertex.

```jsx
import React from 'react';

import { Canvas } from '@texttree/bible-verse-image';
const infocanvas = {
  height: 900,
  width: 900,
};

const elements = [
  {
    type: 'triangle',
    vertex1: { x: 400, y: 10 },
    vertex2: { x: 400, y: 500 },
    vertex3: { x: 150, y: 500 },
    props: {
      fillColor: 'red',
      strokeColor: 'blue',
      strokeWidth: 2,
    },
  },
];

<Canvas infocanvas={infocanvas} elements={elements} className={'w-full'} />;
```

### Draw oval

To use the component, these parameters must be initialized:

## `infocanvas` Object

The `infocanvas` object contains properties that define the dimensions and characteristics of the canvas where the text elements will be drawn.

- `height` (_number, required_): Specifies the height of the canvas in pixels.

- `width` (_number, required_): Specifies the width of the canvas in pixels.

## `elements` Array

To draw an oval (ellipse) on the canvas, you can include an object in the `elements` array with the following properties:

- `type` (_string, required_): Specifies the type of the element. In this case, it should be set to `'oval'`.

- `x` (_number, required_): The x-coordinate of the center of the oval.

- `y` (_number, required_): The y-coordinate of the center of the oval.

- `props` (_object, required_): An object containing properties for configuring the oval element.
  - `radiusX` (_number, required_): The horizontal radius of the oval (half of the width).
  - `radiusY` (_number, required_): The vertical radius of the oval (half of the height).
  - `fillColor` (_string_): The fill color of the oval.
  - `strokeColor` (_string_): The stroke color of the oval's border.
  - `strokeWidth` (_number_): The width of the oval's border in pixels.

```jsx
import React from 'react';

import { Canvas } from '@texttree/bible-verse-image';
const infocanvas = {
  height: 900,
  width: 900,
};

const elements = [
  {
    type: 'oval',
    x: 450,
    y: 400,
    radiusX: 180,
    radiusY: 180,
    props: {
      fillColor: '#ff00ff',
      strokeColor: 'red',
      strokeWidth: 5,
    },
  },
];

<Canvas infocanvas={infocanvas} elements={elements} className={'w-full'} />;
```

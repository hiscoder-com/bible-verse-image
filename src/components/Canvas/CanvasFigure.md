##### Draw line

To draw a line on the canvas, you need include an object in the `elements` array with the following properties:

- `type` (_string, required_): Specifies the type of the element. In this case, it should be set to `'line'`.

- `x1` (_number, required_): The x-coordinate of the starting point of the line.
- `y1` (_number, required_): The y-coordinate of the starting point of the line.
- `x2` (_number, required_): The x-coordinate of the ending point of the line.
- `y2` (_number, required_): The y-coordinate of the ending point of the line.

- `props` (_object, optional_): An object containing properties for configuring the line element.
- `lineColor` (_string_, default: 'black'): The color of the line.
- `lineWidth` (_number_, default: 1): The width of the line in pixels.

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

##### Draw rectangle

To draw a rectangle on the canvas, you need include an object in the `elements` array with the following properties:

- `type` (_string, required_): Specifies the type of the element. In this case, it should be set to `'rectangle'`.

- `x` (_number, required_): The x-coordinate of the top-left corner of the rectangle.
- `y` (_number, required_): The y-coordinate of the top-left corner of the rectangle.
- `width` (_number, required_): The width of the rectangle in pixels.
- `height`(_number, required_): The height of the rectangle in pixels.
- `props` (_object, required_): An object containing properties for configuring the rectangle element.

- `fillColor` (_string_, default: 'white'): The fill color of the rectangle.
- `strokeColor` (_string_, default: 'black'): The stroke color of the rectangle's border.
- `strokeWidth` (_number_, default: 1): The width of the rectangle's border in pixels.

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
    width: 300,
    height: 450,
    props: {
      fillColor: 'blue',
      strokeColor: 'black',
      strokeWidth: 2,
    },
  },
];

<Canvas infocanvas={infocanvas} elements={elements} className={'w-full'} />;
```

##### Draw triangle

To draw a triangle on the canvas, you need include an object in the `elements` array with the following properties:

- `type` (_string, required_): Specifies the type of the element. In this case, it should be set to `'triangle'`.

- `vertex1` (_object, required_): An object specifying the coordinates of the first vertex of the triangle.
- `vertex2` (_object, required_): An object specifying the coordinates of the second vertex of the triangle.
- `vertex3` (_object, required_): An object specifying the coordinates of the third vertex of the triangle.

###### Vertex Properties

Each vertex of the triangle is defined using the following properties:

- `x` (_number, required_): The x-coordinate of the vertex.
- `y` (_number, required_): The y-coordinate of the vertex.

- `props` (_object, required_): An object containing properties for configuring the triangle element.

- `fillColor` (_string_, default: 'white'): The fill color of the triangle.
- `strokeColor` (_string_, default: 'black'): The stroke color of the triangle's border.
- `strokeWidth` (_number_, default: 1): The width of the triangle's border in pixels.

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

##### Draw oval

To draw an oval (ellipse) on the canvas, you need include an object in the `elements` array with the following properties:

- `type` (_string, required_): Specifies the type of the element. In this case, it should be set to `'oval'`.

- `x` (_number, required_): The x-coordinate of the center of the oval.
- `y` (_number, required_): The y-coordinate of the center of the oval.
- `radiusX` (_number, required_): The horizontal radius of the oval (half of the width).
- `radiusY` (_number, required_): The vertical radius of the oval (half of the height).
- `props` (_object, required_): An object containing properties for configuring the oval element.

- `fillColor` (_string_, default: 'white'): The fill color of the oval.
- `strokeColor` (_string_, default: 'black'): The stroke color of the oval's border.
- `strokeWidth` (_number_, default: 1): The width of the oval's border in pixels.

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

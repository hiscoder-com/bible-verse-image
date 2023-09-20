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
    type: 'line',
    x1: 110,
    y1: 140,
    x2: 500,
    y2: 600,
    props: {
      lineColor: 'green',
      lineWidth: 15,
    },
  },
];

<Canvas infocanvas={infocanvas} elements={elements} className={'w-full'} />;
```

##### Drawing lines with gradients

To draw a line with a linear gradient fill, you need to redefine the `lineColor` property as an object with the following parameters:

- `points`(_object, required_): Gradient drawing points.

  - `x1` (_number_, default: coordinate `x1` of the line ): The X-axis starting coordinate for a linear gradient.
  - `y1` (_number_, default: coordinate `y1` of the line ): The Y-axis starting coordinate for a linear gradient.
  - `x2` (_number_, default: coordinate `x2` of the line ): The final X-axis coordinate for a linear gradient
  - `y2` (_number_, default: coordinate `y2` of the line ): The final Y-axis coordinate for a linear gradient

- `colorStop`(_array, required_): Color breakpoints. These points (from 0 to 1) form the colors of the gradient.This properties are formed in an array of objects:

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
    type: 'line',
    x1: 110,
    y1: 140,
    x2: 500,
    y2: 600,
    props: {
      lineColor: {
        points: { x1: 110, y1: 140, x2: 500, y2: 600 },
        colorStop: [
          { position: 0, color: 'red' },
          { position: 0.5, color: 'pink' },
          { position: 1, color: 'orange' },
        ],
      },
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
    type: 'rectangle',
    x: 300,
    y: 400,
    width: 300,
    height: 450,
    props: {
      fillColor: 'yellow',
      strokeColor: 'black',
      strokeWidth: 2,
      filter: 'opacity(.5)',
    },
  },
];

<Canvas infocanvas={infocanvas} elements={elements} className={'w-full'} />;
```

##### Drawing a rectangle with a gradient fill

To draw a rectangle with a linear gradient fill, you need to redefine the `fillColor` property as an object with the following parameters:

- `points`(_object, required_): Gradient drawing points.

  - `x1` (_number_, default: coordinate `x` of the rectangle ): The X-axis starting coordinate for a linear gradient.
  - `y1` (_number_, default: coordinate `y` of the rectangle ): The Y-axis starting coordinate for a linear gradient.
  - `x2` (_number_, default: coordinate `x + width` of the rectangle ): The final X-axis coordinate for a linear gradient
  - `y2` (_number_, default: coordinate `y` of the rectangle ): The final Y-axis coordinate for a linear gradient

- `colorStop`(_array, required_): Color breakpoints. These points (from 0 to 1) form the colors of the gradient.This properties are formed in an array of objects:

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
    type: 'rectangle',
    x: 300,
    y: 400,
    width: 300,
    height: 450,
    props: {
      fillColor: {
        points: {},
        colorStop: [
          { position: 0, color: 'red' },
          { position: 0.5, color: 'pink' },
          { position: 1, color: 'orange' },
        ],
      },
      strokeColor: 'black',
      strokeWidth: 2,
      filter: 'opacity(.5)',
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
    type: 'triangle',
    vertex1: { x: 400, y: 10 },
    vertex2: { x: 400, y: 500 },
    vertex3: { x: 150, y: 500 },
    props: {
      fillColor: 'brown',
      strokeColor: 'blue',
      strokeWidth: 2,
    },
  },
];

<Canvas infocanvas={infocanvas} elements={elements} className={'w-full'} />;
```

##### Drawing a triangle with a gradient fill

To draw a triangle with a linear gradient fill, you need to redefine the `fillColor` property as an object with the following parameters:

- `points`(_object, required_): Gradient drawing points.

  - `x1` (_number_, default: minimum value from `vertex 1.x`, `vertex 2.x`, `vertex 3.x` of the triangle ): The X-axis starting coordinate for a linear gradient.
  - `y1` (_number_, default: coordinate `vertex1.y` of the triangle ): The Y-axis starting coordinate for a linear gradient.
  - `x2` (_number_, default: maximum value from `vertex 1.x`, `vertex 2.x`, `vertex 3.x` of the triangle ): The final X-axis coordinate for a linear gradient
  - `y2` (_number_, default: coordinate `vertex1.y` of the triangle ): The final Y-axis coordinate for a linear gradient

- `colorStop`(_array, required_): Color breakpoints. These points (from 0 to 1) form the colors of the gradient.This properties are formed in an array of objects:

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
    type: 'triangle',
    vertex1: { x: 400, y: 10 },
    vertex2: { x: 400, y: 500 },
    vertex3: { x: 150, y: 500 },
    props: {
      fillColor: {
        points: {},
        colorStop: [
          { position: 0, color: 'red' },
          { position: 0.5, color: 'pink' },
          { position: 1, color: 'orange' },
        ],
      },
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
    type: 'oval',
    x: 450,
    y: 400,
    radiusX: 180,
    radiusY: 180,
    props: {
      fillColor: 'pink',
      strokeColor: 'red',
      strokeWidth: 5,
    },
  },
];

<Canvas infocanvas={infocanvas} elements={elements} className={'w-full'} />;
```

##### Drawing a oval with a gradient fill

To draw a oval (ellipse) with a linear gradient fill, you need to redefine the `fillColor` property as an object with the following parameters:

- `points`(_object, required_): Gradient drawing points.

  - `x1` (_number_, default: coordinate `x - radiusX` of the oval ): The X-axis starting coordinate for a linear gradient.
  - `y1` (_number_, default: coordinate `y` of the oval ): The Y-axis starting coordinate for a linear gradient.
  - `x2` (_number_, default: coordinate `x + radiusY` of the oval ): The final X-axis coordinate for a linear gradient
  - `y2` (_number_, default: coordinate `y` of the oval ): The final Y-axis coordinate for a linear gradient

- `colorStop`(_array, required_): Color breakpoints. These points (from 0 to 1) form the colors of the gradient.This properties are formed in an array of objects:

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
    type: 'oval',
    x: 450,
    y: 400,
    radiusX: 180,
    radiusY: 180,
    props: {
      fillColor: {
        points: {},
        colorStop: [
          { position: 0, color: 'red' },
          { position: 0.5, color: 'pink' },
          { position: 1, color: 'orange' },
        ],
      },
      strokeColor: 'red',
      strokeWidth: 5,
    },
  },
];

<Canvas infocanvas={infocanvas} elements={elements} className={'w-full'} />;
```

## Description

The Canvas component from the @texttree/bible-verse-image library enables the creation of intricate images by amalgamating diverse elements, such as background images, text, and other graphical components, onto a single canvas. This functionality proves valuable for generating dynamic images suitable for applications, websites, and various contexts demanding visual content.

To use the component, these props must be initialized:

### Props

The `Canvas component` accepts several props:

#### `infocanvas` Object

The `infocanvas` object contains properties that define the dimensions and characteristics of the canvas where the text elements will be drawn.

- `height` (_number, required_): Specifies the height of the canvas in pixels.
- `width` (_number, required_): Specifies the width of the canvas in pixels.

#### `elements` Array

To draw an element on the `canvas`, you need to define an object with a description in the `elements` array. The functionality allows drawing shapes, images and text. Detailed information will be provided below.

Tailwind features are used to style the component.

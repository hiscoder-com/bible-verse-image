import React, { useState } from 'react';
import { Canvas, SearchPhotosApp } from '@texttree/bible-verse-image';

const infocanvas = {
  height: 1200,
  width: 1200,
};

const styleClassWidject = {
  labelStyle: 'text-5xl mb-4',
  inputStyle: 'text-3xl px-2 leading-10 rounded-2xl bg-white mb-4 border border-black',
};

const styleClassComponets = {
  labelStyle: 'text-5xl mb-4',
  inputStyle: 'text-3xl px-2 leading-10 rounded-2xl bg-white mb-4 border  border-black',
  buttonStyle:
    'bg-slate-950 text-white pr-6 pl-6  pb-3 pt-3 border-black border-solid rounded-3xl text-2xl cursor-pointer transition hover:bg-stone-900',
  cardStyle: 'mb-4 flex w-6/12 h-3/6',
  cardImageStyle: 'flex-1 rounded-xl',
  cardCurrentStyle: 'rounded-xl  border-y-4 border-solid border-indigo-500',
  cardLisStyle: 'columns-3',
};

const BibleVerseImage = () => {
  const [url, setUrl] = useState(
    'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NjQwOTl8MHwxfHNlYXJjaHwxfHx3aGl0ZXxlbnwwfHx8fDE2ODczNDczNTZ8MA&ixlib=rb-4.0.3&q=80&w=1200'
  );
  const [infoimage, setInfoImage] = useState({
    srcimage: url,
  });
  const [elements, setElements] = useState([
    {
      type: 'text',
      textWidget: 'Company: ',
      x: 70,
      y: 70,
      props: {
        text: 'OBT',
        fillStyle: 'black',
        font: 'small-caps 30px Helvetica, Arial, sans-serif',
        textAlign: 'center',
        url: '',
      },
    },
    {
      type: 'text',
      textWidget: 'Verse: ',
      x: 600,
      y: 550,
      props: {
        text: 'God is love',
        fillStyle: 'black',
        font: 'small-caps 120px Helvetica, Arial, sans-serif',
        textAlign: 'center',
        url: '',
      },
    },
    {
      type: 'text',
      textWidget: 'Ref: ',
      x: 600,
      y: 650,
      props: {
        text: '1 Jon 4:8',
        fillStyle: 'black',
        font: 'small-caps 40px Helvetica, Arial, sans-serif',
        textAlign: 'center',
      },
    },
    {
      type: 'text',
      textWidget: 'Src: ',
      x: 600,
      y: 1150,
      props: {
        text: 'ESV',
        fillStyle: 'black',
        font: 'small-caps 120px Helvetica, Arial, sans-serif',
        textAlign: 'center',
      },
    },
  ]);

  const handleImageChange = (imageUrl) => {
    setUrl(imageUrl);
    setInfoImage((prevInfoImage) => ({
      ...prevInfoImage,
      srcimage: imageUrl,
    }));
  };

  const handleTextChange = (index, event) => {
    const { value } = event.target;
    setElements((prevElements) => {
      const updatedElements = [...prevElements];
      updatedElements[index].props.text = value;
      return updatedElements;
    });
  };

  return (
    <div>
      <div className="border  border-black">
        <SearchPhotosApp
          handleChangeUrl={handleImageChange}
          styleClassComponets={styleClassComponets}
        />
      </div>
      <br />
      <br />
      <br />
      <div className="border  border-black">
        {elements.map((textStyle, index) => (
          <div key={index}>
            <label className={styleClassWidject.labelStyle} htmlFor="text">
              {textStyle.textWidget}
            </label>
            <input
              className={styleClassWidject.inputStyle}
              type="text"
              name="text"
              value={textStyle.props.text}
              onChange={(event) => handleTextChange(index, event)}
            />
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <div>
        <Canvas
          organization="OBT"
          infocanvas={infocanvas}
          infoimage={infoimage}
          elements={elements}
          className={'w-full'}
        />
      </div>
    </div>
  );
};

export default BibleVerseImage;

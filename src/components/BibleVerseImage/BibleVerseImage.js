import React, { useState } from 'react';
import { Canvas, SearchPhotosApp } from '@texttree/bible-verse-image';

const infocanvas = {
  height: 1200,
  width: 1200,
};

const elements = [
  {
    type: 'text',
    x: 70,
    y: 70,
    props: {
      text: 'OBT',
      fillStyle: 'white',
      font: 'small-caps 30px Helvetica, Arial, sans-serif',
      textAlign: 'center',
      url: '',
    },
  },
  {
    type: 'text',
    x: 600,
    y: 550,
    props: {
      text: 'God is love',
      fillStyle: 'white',
      font: 'small-caps 120px Helvetica, Arial, sans-serif',
      textAlign: 'center',
      url: '',
    },
  },

  {
    type: 'text',
    x: 600,
    y: 650,
    props: {
      text: '1 Jon 4:8',
      fillStyle: 'white',
      font: 'small-caps 40px Helvetica, Arial, sans-serif',
      textAlign: 'center',
    },
  },

  {
    type: 'text',
    x: 600,
    y: 1150,
    props: {
      text: 'ESV',
      fillStyle: 'white',
      font: 'small-caps 120px Helvetica, Arial, sans-serif',
      textAlign: 'center',
    },
  },
];

const styleClassComponets = {
  labelStyle: 'text-5xl mb-4',
  inputStyle: 'text-3xl px-2 leading-10 rounded-2xl bg-white mb-4',
  buttonStyle:
    'bg-slate-950 text-white pr-6 pl-6  pb-3 pt-3 border-black border-solid rounded-3xl text-2xl cursor-pointer transition hover:bg-stone-900',
  cardStyle: 'mb-4 flex w-6/12 h-3/6',
  cardImageStyle: 'flex-1 rounded-xl',
  cardCurrentStyle: 'rounded-xl  border-y-4 border-solid border-indigo-500',
  cardLisStyle: 'columns-3',
};

export default function BibleVerseImage() {
  const [url, setUrl] = useState('');
  const [infoimage, setInfoImage] = useState({
    srcimage: url,
    // zoom: 1,
    // offsetX: 100,
    // offsetY: 0,
  });

  const handleImageChange = (imageUrl) => {
    setUrl(imageUrl);
    setInfoImage((prevInfoImage) => ({
      ...prevInfoImage,
      srcimage: imageUrl,
    }));
  };

  return (
    <div>
      <div>
        <SearchPhotosApp
          handleChangeUrl={handleImageChange}
          styleClassComponets={styleClassComponets}
        />
      </div>
      <br />
      <br />
      <br />
      <div>
        {elements.map((textStyle, index) => (
          <div key={index}>
            <label htmlFor="text">{textStyle.props.text}</label>
            <input
              className={styleClassComponets.inputStyle}
              type="text"
              name="text"
              value={textStyle.props.text}
              readOnly
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
}

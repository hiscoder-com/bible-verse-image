const path = require('path');
const webpack = require('webpack');
const { name, version, url } = require('./package.json');
const dotenv = require('dotenv');

// call dotenv and it will return an Object with a parsed key
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

let sections = [
  {
    name: 'README',
    content: 'README.md',
  },
  {
    name: 'Hooks',
    components: ['src/components/useSearchPhotos/useSearchPhotos.jsx'],
  },
  {
    name: 'Button Block',
    components: ['src/components/Button/Button.js'],
  },
  {
    name: 'Canvas Block',
    components: ['src/components/Canvas/Canvas.js'],
  },
  {
    name: 'Search Block',
    components: ['src/components/SearchPhotosApp/SearchPhotosApp.js'],
  },
];

module.exports = {
  components: 'src/components/**/[A-Z]*.js',
  ribbon: {
    url,
    text: 'Open on GitHub',
  },
  title: `${name} v${version}`,
  template: {
    head: {
      meta: [
        {
          name: 'description',
          content: 'React component library template',
        },
      ],
    },
  },
  moduleAliases: { [name]: path.resolve(__dirname, 'src') },
  skipComponentsWithoutExample: true,
  sections,
  styles: function styles(theme) {
    return {
      ComponentsList: {
        isSelected: {
          fontWeight: 'normal',
          '&>a': {
            fontWeight: 'bold !important',
          },
        },
      },
      Code: {
        code: {
          backgroundColor: '#eff1f3',
          fontSize: 14,
          borderRadius: '6px',
          padding: '.2em .4em',
        },
      },
    };
  },
  theme: {
    color: {
      link: '#4B4E6A',
      linkHover: '#2B3847',
      baseBackground: '#fff',
      border: '#D0DAE4',
      sidebarBackground: '#fff',
    },
    fontFamily: {},
  },
  exampleMode: 'expand',
  usageMode: 'expand',
  pagePerSection: true,
  getComponentPathLine(componentPath) {
    const componentName = path.basename(componentPath, '.js');
    return `import { ${componentName} } from '${name}';`;
  },
  updateExample(props, exampleFilePath) {
    const { settings, lang } = props;
    if (typeof settings?.file === 'string') {
      const filepath = path.resolve(path.dirname(exampleFilePath), settings.file);
      settings.static = true;
      delete settings.file;
      return {
        content: fs.readFileSync(filepath, 'utf8'),
        settings,
        lang,
      };
    }
    return props;
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      ],
    },
    plugins: [new webpack.DefinePlugin(envKeys)],
  },
};

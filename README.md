# Web page benchmark

## Features

 - Under development

## Installation

```bash
# clone it
$ git clone https://github.com/jhen0409/react-chrome-extension-boilerplate.git

# Install dependencies
$ npm install
```

## Development

* Run script
```bash
# build files to './dev'
# start webpack development server
$ npm run dev
```

* If you're developing Inject page, please allow `https://localhost:3000` connections. (Because `injectpage` injected GitHub (https) pages, so webpack server procotol must be https.)
* [Load unpacked extensions](https://developer.chrome.com/extensions/getstarted#unpacked) with `./dev` folder.
## Build

```bash
# build files to './build'
$ npm run build
```

## Compress

```bash
# compress build folder to {manifest.name}.zip and crx
$ npm run build
$ npm run compress -- [options]
```
## LICENSE

[MIT](LICENSE)

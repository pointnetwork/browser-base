# Point Browser

This repo is a fork of [Eryk Rakowski](sentialx@gmail.com)'s [Wexond browser](https://github.com/wexond/browser-base), aimed to be used for the point network.

# How to run
```bash
$ git clone https://github.com/pointnetwork/browser-base pointBrowser
$ cd pointBrowser
$ yarn
$ yarn dev
```

# Update proxy settings on browser build

To update the the proxy settings you will need to:

1. Stop the browser
1. Open [src/main/fork/point/constants/settings.ts](src/main/fork/point/constants/settings.ts) file and change the value directly there.
1. Opne [src/main/fork/point/settings/PointSettings.ts](src/main/fork/point/settings/PointSettings.ts) and uncomment the line `json = POINT_SETTINGS` stated in the developer comment in the try block of the `load()` function.
1. Start the browser using `yarn dev`

## Update Log
- 2/20 made point URLs work(.z urls), applied proxies to connect to point network nodes
- 2/21 Made the pre-defined proxy editable via settings > proxy settings in the browser
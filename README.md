# Collab-Swag
_A collaborative real-time Swagger editor_

![Screenshot of webapp] (screenshot.png)

This webapp allows multiple users to simultaneously create and edit a Swagger YAML file. Validation and human-readable preview documentation is updated as users type in a right-hand panel.

This is a React app that utilizes [Firebase](https://firebase.google.com/) for its realtime synchronization and database hosting.

You can run your own instance of the app by creating a new project on Firebase and setting the configuration values in `src/js/config.js` to those provided by Firebase.

## Requirements
To build the app, you will need:

* [NodeJS](https://nodejs.org/en/) for the npm package manager
* [Gulp](http://gulpjs.com/)

## Building the App
1. Run `npm install`
2. Update `src/js/config.js` with values from your Firebase console. Optionally, change `dev` to `true` if you want the JS to be unminified and to use [Redux Dev Tools](https://github.com/gaearon/redux-devtools).
3. Run `gulp` to build the app.

You can optionally run `gulp dev`, which will serve (and watch/livereload on JS/Sass source change) a development version of the app locally on port 5000.

The Gulp task will output the files to `/public`, which you can then host on your preferred provider. If hosting somewhere other than Firebase or localhost, you'll need to add the domain to your Firebase console (under Auth -> Sign In Method -> OAuth redirect domains).

## License/Support
Released under an MIT license. Comcast-level support is provided (in other words, no support).

The MIT License (MIT)

Copyright (c) 2016 Kevin Li

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
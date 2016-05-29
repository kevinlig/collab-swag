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
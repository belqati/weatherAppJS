# <img src="public/imgs/github_icon.ico" width="30px"> WeatherAppJS

*WeatherAppJS* is an app created under the direction of [Brad Traversy](https://www.udemy.com/modern-javascript-from-the-beginning/) in his *Modern JavaScript from the Beginning* course. The app uses the following technologies:

  * JavaScript ES6
  * HTML
  * CSS
  * Bootstrap 4

<img src="public/imgs/SearchGitHub.JPG" width="50%">


The app needs to be refactored with a simple server in order to take advantage of environment variables using `dotenv`. If you wish to use this app for your own purposes, simply replace `process.env.DARKSKY_SECRET` in `weather.js` with your own API key. If you do not have one, create an account at [Dark Sky](https://github.com/settings/applications/new) to obtain a key.

### Description and features

This app uses the Dark Sky api to 

<img src="public/imgs/SearchGitHub_results.JPG" width="50%">

Incomplete fetch values are clearly marked, rather than displaying no data, `null`, or `undefined`.

<img src="public/imgs/SearchGitHub_no_data.JPG" width="50%">

If a search fails a temporary alert appears.

<img src="public/imgs/SearchGitHub_no_user.JPG" width="50%">
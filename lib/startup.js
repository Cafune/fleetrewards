// startup.js

Meteor.startup(function () {
  // code to run on server at startup
  Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://home.m6u.net:3000';
});

// login.js

Template.login.onRendered(function () {
  document.body.className='loginScreen';
});

Template.login.onDestroyed(function () {
  document.body.className='';
});

Template.login.events({
  "click #login": function (event, template) {
    Meteor.loginWithEve();
  }
});

// login.js

Template.login.events({
  "click #login": function (event, template) {
    Meteor.loginWithEve();
  }
});

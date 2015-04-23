// dirtcamp.js.js
Fleets = new Mongo.Collection("fleets");
Rewards = new Mongo.Collection("rewards");

// routes
Router.map( function () {
  this.route('home', {path: '/'} );
  this.route('admin');
});

if (Meteor.isClient) {
  // get fleets
  Template.body.helpers({
    fleets: function () {
      return Fleets.find({});
    }
  });

  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.fleetSubmission.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.rewards.helpers({
    rewards2: function () {
      return Rewards.find({});
    }
  });

  Template.fleetSubmission.events({
    "submit form": function (event, template) {
    // This function is called when the new fleet form is submitted

    var userId = "celmi";
    var papLink = event.target.papLink.value;
    var ping = event.target.ping.value;
    var additionalInformation = event.target.additionalInformation.value;
    var status = "pending";
    var date = new Date();

    Fleets.insert({
      user_id: userId,
      pap_link: papLink,
      ping: ping,
      additional_information: additionalInformation,
      status: status,
      created: date, // current time
      modified: date
    });

    // Clear form
    event.target.papLink.value = "";
    event.target.ping.value = "";
    event.target.additionalInformation.value = "";

    // Prevent default form submit
    return false;
  }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

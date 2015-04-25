// home.js

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

Template.fleetsAndPayouts.helpers({
  fleetsAndPayouts: function() {
    var fleets = Fleets.find({user_id: Meteor.userId()}).fetch();
    var payouts = Payouts.find({user_id: Meteor.userId()}).fetch();
    var together = fleets.concat(payouts);
    //return _.sortBy(together, function(together) {
      //return together.modified;
    //});
    together =  _.sortBy(together, 'modified');
    return together.reverse();
  }
});

Template.fleetHistory.helpers({
  fleets: function () {
    return Fleets.find({user_id: Meteor.userId()}).fetch();
  }
});

Template.payoutHistory.helpers({
  payouts: function () {
    var payouts = Payouts.find({user_id: Meteor.userId()}).fetch();
    for (var i = 0; i < payouts.length; i++) {
      var reward = Rewards.findOne(payouts[i].reward_id);
      payouts[i].reward_name = reward.name;
      payouts[i].reward_type = reward.type;
    }
    return payouts;
  }
});

Template.fleetSubmission.events({
  "submit form": function (event, template) {
  // This function is called when the new fleet form is submitted

  var userId = 'celmi';
  var papLink = event.target.papLink.value;
  var ping = event.target.ping.value;
  var additionalInformation = event.target.additionalInformation.value;
  var status = 'pending';
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
  event.target.papLink.value = '';
  event.target.ping.value = '';
  event.target.additionalInformation.value = '';

  // Prevent default form submit
  return false;
}
});

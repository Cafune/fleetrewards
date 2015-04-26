// home.js

Template.points.helpers({
  points: function () {
    var user = Meteor.user();
    return user.profile.points;
  }
});

Template.fleetSubmission.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.fleetSubmission.events({
  "submit form": function (event, template) {
  // This function is called when the new fleet form is submitted

  var userId = Meteor.userId();
  var papLink = event.target.papLink.value;
  var ping = event.target.ping.value;
  var additionalInformation = event.target.additionalInformation.value;
  var status = 'Pending';
  var date = new Date(); // current date

  Fleets.insert({
    user_id: userId,
    pap_link: papLink,
    ping: ping,
    additional_information: additionalInformation,
    status: status,
    created: date,
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

Template.rewards.helpers({
  rewards: function () {
    return Rewards.find({});
  }
});

Template.rewards.events({
  "click .btn": function (event, template) {

    // check if they have enough points
    var user = Meteor.user();
    var userId = user._id;
    if (user['profile'].points - this.point_cost < 0) {
      // don't have enough points
      return false;
    }
    // add a new payout
    var status = 'Pending';
    var date = new Date(); // current time
    Payouts.insert({
      user_id: userId,
      reward_id: this._id,
      point_cost: this.point_cost,
      isk_cost: this.isk_cost,
      status: status,
      created: date,
      modified: date
    });
    // remove points from user
    var points = user['profile'].points - this.point_cost;
    Meteor.users.update(userId, {$set: {'profile.points': points}});

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
    return Fleets.find({user_id: Meteor.userId()}, {sort: {modified: -1}}).fetch();
  }
});

Template.payoutHistory.helpers({
  payouts: function () {
    var payouts = Payouts.find({user_id: Meteor.userId()}, {sort: {modified: -1}}).fetch();
    for (var i = 0; i < payouts.length; i++) {
      var reward = Rewards.findOne(payouts[i].reward_id);
      payouts[i].reward_name = reward.name;
      payouts[i].reward_type = reward.type;
    }
    return payouts;
  }
});

Template.payoutHistory.events({
  "click .btn": function (event, template) {

    // delete a pending payout
    if (this.status == 'Pending') {
      Payouts.remove(this._id);
    }
    // restore points to user
    var user = Meteor.user();
    var userId = user._id;
    var points = user['profile'].points + this.point_cost;
    Meteor.users.update(userId, {$set: {'profile.points': points}});

  }
});

Template.fleetHistory.events({
  "click .btn": function (event, template) {

    // delete a pending fleet
    if (this.status == 'Pending') {
      Fleets.remove(this._id);
    }

  }
});

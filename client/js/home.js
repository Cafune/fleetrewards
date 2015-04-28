// home.js

Template.home.rendered = function() {
  $('[data-toggle="tooltip"]').tooltip() //initialize all tooltips in this template
};

Template.points.helpers({
  points: function () {
    var user = Meteor.user();
    return user && user.profile && user.profile.points;
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
  var fleetName = event.target.fleetName.value;
  var papLink = event.target.papLink.value;
  var ping = event.target.ping.value;
  var additionalInformation = event.target.additionalInformation.value;
  var status = 'Pending';
  var date = new Date(); // current date

  Fleets.insert({
    user_id: userId,
    fleet_name: fleetName,
    pap_link: papLink,
    ping: ping,
    additional_information: additionalInformation,
    status: status,
    created: date,
    modified: date
  }, function(error, result) {
    if (result == false) {
      // insert failed
      toastr.error(error.message, 'Fleet Submission');
    }
    else {
      // insert succeeded
      // Clear form
      event.target.papLink.value = '';
      event.target.ping.value = '';
      event.target.additionalInformation.value = '';

      // display notification
      toastr.success('Fleet successfully submitted', 'Fleet Submission');
    }
  });
  // Prevent form submit
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
      return toastr.error('You do not have enough points', 'Rewards');;
    }
    // add a new payout
    var status = 'Pending';
    var date = new Date(); // current time
    var points = user['profile'].points - this.point_cost;

    Payouts.insert({
      user_id: userId,
      reward_id: this._id,
      point_cost: this.point_cost,
      isk_cost: this.isk_cost,
      status: status,
      created: date,
      modified: date
    }, function(error, result) {
      if (result == false) {
        // insert failed
        toastr.error(error.message, 'Rewards Error');
      }
      else {
        // insert succeeded
        // remove points from user
        console.log(points);
        Meteor.users.update(userId, {$set: {'profile.points': points}});

        // display notification
        toastr.success(this.name + ' successfully purchased', 'Rewards');
      }

    });

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
      toastr.success('Payout successfully deleted and refunded', 'Payout History');
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
      toastr.success('Fleet successfully deleted', 'Fleet History');
    }

  }
});

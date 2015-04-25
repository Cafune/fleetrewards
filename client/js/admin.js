// admin.js

Template.adminFleets.helpers({
  fleets: function () {
    var fleets = Fleets.find().fetch();
    for (var i = 0; i < fleets.length; i++) {
      var user = Meteor.users.findOne(fleets[i].user_id);
      fleets[i].user_name = user.profile.name;
    }
    return fleets;
  }
});

Template.adminPayouts.helpers({
  payouts: function () {
    var payouts = Payouts.find().fetch();
    for (var i = 0; i < payouts.length; i++) {
      var user = Meteor.users.findOne(payouts[i].user_id);
      payouts[i].user_name = user.profile.name;
      var reward = Rewards.findOne(payouts[i].reward_id);
      payouts[i].reward_name = reward.name;
      payouts[i].reward_type = reward.type;
    }
    return payouts;
  }
});

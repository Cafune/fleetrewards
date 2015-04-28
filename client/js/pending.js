// admin.js

Template.dirtcampWallet.helpers({
  dirtcamp_isk: function () {
    var dng =  Corporations.findOne({corp_ticker: 'D-N-G'});
    var balance = dng && dng.wallet && dng.wallet.balance
    return numeral(balance).format('0,0.00');
  }
});

Template.adminFleets.helpers({
  fleets: function () {
    var fleets = Fleets.find({}, {sort: {modified: -1}}).fetch();
    for (var i = 0; i < fleets.length; i++) {
      var user = Meteor.users.findOne(fleets[i].user_id);
      fleets[i].user_name = user && user.profile && user.profile.name;;
    }
    return fleets;
  }
});

Template.adminFleets.helpers({
  fleets: function () {
    var fleets = Fleets.find({}, {sort: {modified: -1}}).fetch();
    for (var i = 0; i < fleets.length; i++) {
      var user = Meteor.users.findOne(fleets[i].user_id);
      fleets[i].user_name = user && user.profile && user.profile.name;;
    }
    return fleets;
  }
});

Template.adminPayouts.helpers({
  payouts: function () {
    var payouts = Payouts.find({}, {sort: {modified: -1}}).fetch();
    for (var i = 0; i < payouts.length; i++) {
      var user = Meteor.users.findOne(payouts[i].user_id);
      payouts[i].user_name = user.profile.name;
      var reward = Rewards.findOne(payouts[i].reward_id);
      payouts[i].reward_name = reward.name;
      payouts[i].reward_type = reward.type;
      payouts[i].isk_cost = numeral(payouts[i].isk_cost).format('0,0.00');
    }
    return payouts;
  }
});

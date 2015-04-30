/* adminPayouts.js */

Template.adminPayoutDatatable.onRendered(function () {
  this.$('#datatable').dataTable({
    "order":[[0,'desc']]
  });
});

Template.adminPayoutDatatable.helpers({
  payouts: function () {
    var payouts = Payouts.find({}, {'sort': {'modified': -1}}).fetch();
    for (var i = 0; i < payouts.length; i++) {
      var user = Meteor.users.findOne(payouts[i].user_id);
      payouts[i].user_name = user.profile.name;
      var admin = Meteor.users.findOne(payouts[i].user_id);
      payouts[i].filled_by = admin.profile.name;
      var reward = Rewards.findOne(payouts[i].reward_id);
      payouts[i].reward_name = reward.name;
      payouts[i].reward_type = reward.type;
      payouts[i].isk_cost = numeral(payouts[i].isk_cost).format('0,0.00');
    }
    return payouts;
  }
});

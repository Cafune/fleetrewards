Template.userPayoutDatatable.onRendered(function () {
 this.$('#datatable').dataTable();
});

Template.userPayoutDatatable.helpers({
  payouts: function () {
    var payouts = Payouts.find({'user_id': Meteor.userId()}, {'sort': {'modified': -1}}).fetch();
    for (var i = 0; i < payouts.length; i++) {
      var reward = Rewards.findOne(payouts[i].reward_id);
      payouts[i].reward_name = reward.name;
      payouts[i].reward_type = reward.type;
    }
    return payouts;
  }
});

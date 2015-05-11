Template.userPayoutDatatable.onRendered(function () {
 this.$('#datatable').dataTable({
   "order":[[0,'desc']]
 });
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

Template.userPayoutStats.onRendered(function () {
  var userId = Meteor.userId();
  var fleetsApproved = Fleets.find({'user_id': userId, 'status':'Approved'}).count();
  var fleetsDenied = Fleets.find({'user_id': userId, 'status':'Denied'}).count();
  var fleetsTotal = fleetsApproved + fleetsDenied;
  var approvalPercent = fleetsApproved / fleetsTotal;
  var denialPercent = fleetsDenied / fleetsTotal;

  var data = {
    series: [fleetsApproved,fleetsDenied]
  };

  var sum = function(a, b) { return a + b };

  new Chartist.Pie('#chart-userFleets', data, {
  labelInterpolationFnc: function(value) {
    return Math.round(value / data.series.reduce(sum) * 100) + '%';
  }
});
});

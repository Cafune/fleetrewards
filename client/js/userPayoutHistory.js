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

Template.userPayoutStats.helpers({

  fleetChart: function() {

    var userId = Meteor.userId();
    var fleetsApproved = Fleets.find({'user_id':userId, 'Status':'Approved'}).count();
    var fleetsDenied = Fleets.find({'user_id':userId, 'Status':'Denied'}).count();

    var data = {
      labels: ['Fleets Approved', 'Fleets Denied'],
      series: [fleetsApproved, fleetsDenied]
    };

    var options = {
      labelInterpolationFnc: function(value) {
        return value[0]
      }
    };

    var responsiveOptions = [
      ['screen and (min-width: 640px)', {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc: function(value) {
          return value;
        }
      }],

      ['screen and (min-width: 1024px)', {
        labelOffset: 80,
        chartPadding: 20
      }]
    ];

    new Chartist.Pie('.fleet-chart', data, options, responsiveOptions);
  }


});

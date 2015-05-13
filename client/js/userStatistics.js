Template.userFleetStatistics.onRendered(function () {

  var userId = Meteor.userId();

  var fleetsApproved = Fleets.find({'user_id': userId, 'status':'Approved'}).count();
  var fleetsDenied = Fleets.find({'user_id': userId, 'status':'Denied'}).count();
  var fleetsTotal = fleetsApproved + fleetsDenied;
  var fleetApprovalPercent = fleetsApproved / fleetsTotal;
  var fleetDenialPercent = fleetsDenied / fleetsTotal;

  /*
  var pointsOutstanding = foo;
  var pointsTotal = bar;
  var pointsSpent = pointsTotal-PointsOutstanding;

  var fleetData = {
    series: [fleetsApproved,fleetsDenied]
  };
  var pointData = {
    series: [pointsOutstanding,pointsSpent]
  };
  */

  var sum = function(a, b) { return a + b };

  new Chartist.Pie('#chart-userFleets', fleetData, {
  labelInterpolationFnc: function(value) {
    return Math.round(value / fleetData.series.reduce(sum) * 100) + '%';
  }
  });

  /*
  new Chartist.Pie('#chart-userPoints', pointData, {
    labelInterpolationFnc: function(value) {
      return Math.round(value / pointData.series.reduce(sum) * 100) + '%';
    }
  });
  */

});

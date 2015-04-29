/* adminShared.js */

Template.adminHeader.helpers({
  unredeemed_isk: function () {
    var dng =  Corporations.findOne({corp_ticker: 'D-N-G'});
    var users = Meteor.users.find().fetch();
    var pointValue = dng && dng.point_value;
    var points = 0;
    for (var i = 0; i < users.length; i++) {
      points = users[i].profile.points;
    }
    var iskValue = pointValue * points;
    return numeral(iskValue).format('0,0.00');

    var dng =  Corporations.findOne({corp_ticker: 'D-N-G'});
    var balance = dng && dng.wallet && dng.wallet.balance
    return numeral(balance).format('0,0.00');
  },
  dirtcamp_isk: function () {
    var dng =  Corporations.findOne({corp_ticker: 'D-N-G'});
    var balance = dng && dng.wallet && dng.wallet.balance
    return numeral(balance).format('0,0.00');
  }
});

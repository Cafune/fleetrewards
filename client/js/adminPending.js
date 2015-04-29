// admin.js

Template.pendingAdminFleets.helpers({
  pendingFleets: function () {
    var fleets = Fleets.find({status: 'Pending'}, {sort: {modified: -1}}).fetch();
    for (var i = 0; i < fleets.length; i++) {
      var user = Meteor.users.findOne(fleets[i].user_id);
      fleets[i].user_name = user && user.profile && user.profile.name;;
    }
    return fleets;
  }
});

/*Template.adminFleets.helpers({
  fleets: function () {
    var fleets = Fleets.find({}, {sort: {modified: -1}}).fetch();
    for (var i = 0; i < fleets.length; i++) {
      var user = Meteor.users.findOne(fleets[i].user_id);
      fleets[i].user_name = user && user.profile && user.profile.name;;
    }
    return fleets;
  }
});*/

Template.pendingAdminPayouts.helpers({
  pendingPayouts: function () {
    var payouts = Payouts.find({status: 'Pending'}, {sort: {modified: -1}}).fetch();
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

Template.pendingAdminFleets.events({
  'click .btn': function (event, template) {
    $('#fleetId').val(this._id);
    $('#userName').text(this.user_name);
    $('#fleetName').val(this.fleet_name);
    $('#papLink').val(this.pap_link);
    $('#ping').val(this.ping);
    $('#additionalInformation').val(this.additional_information);
  }
});

Template.modal.events({
  'submit form': function (event, template) {

    console.log(this._id);
    console.log('test');
    /*var userId = Meteor.userId();
    var fleetName = event.target.fleetName.value;
    var papLink = event.target.papLink.value;
    var ping = event.target.ping.value;
    var additionalInformation = event.target.additionalInformation.value;
    var status = 'Pending';
    var date = new Date(); // current date
    */
    return false;
  }
});

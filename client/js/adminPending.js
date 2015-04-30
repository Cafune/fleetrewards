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
    var json = {'fleetId': this._id};
    Session.set('fleet', json);
    $('#fleetId').val(this._id);
    $('#userName').text(this.user_name);
    $('#date').text(moment(this.created).format('MM-DD-YYYY'));
    $('#fleetName').val(this.fleet_name);
    $('#papLink').val(this.pap_link);
    $('#ping').val(this.ping);
    $('#additionalInformation').val(this.additional_information);

    $('#pendingAdminFleets').hide();
    $('#adminViewPendingFleet').show();
  }
});

Template.adminViewPendingFleet.events({
  'click #cancel': function (event, template) {
    $('#adminViewPendingFleet').hide();
    $('#pendingAdminFleets').show();
    var fleet = Session.get('fleet');
    console.log(fleet.fleetId);
  },
  'click #approve': function (event, template) {
    console.log('approve');

    var fleet = Session.get('fleet');
    console.log(fleet.fleetId);
    delete Session.keys['fleet'];

    var adminNotes = template.find('input[name=adminNotes]');
    var points = template.find('select[name=selector]');
    console.log(adminNotes);
    console.log(points);

    event.preventDefault();
  },
  /*'click #deny': function (event, template) {
    console.log('deny');
  },*/
  'submit form': function (event, template) {

    //delete Session.keys['foo']
    console.log('form submit');
    //console.log(this._id);
    //console.log('test');

    /*var userId = Meteor.userId();
    var fleetName = event.target.fleetName.value;
    var papLink = event.target.papLink.value;
    var ping = event.target.ping.value;
    var additionalInformation = event.target.additionalInformation.value;
    var status = 'Pending';
    var date = new Date(); // current date*/
    event.preventDefault();
    //return false;
  }
});

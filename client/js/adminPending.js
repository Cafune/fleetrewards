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
  'click .view-submission': function (event, template) {
    var json = {'fleetId': this._id, 'userId': this.user_id};
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
    $('#adminNotes').val('');
    $('#rewardAmount option').eq(0).prop('selected', true);
  },
  'click #approve': function (event, template) {
    // get values
    var fleetJson = Session.get('fleet');
    fleet = Fleets.findOne({'_id': fleetJson.fleetId});
    userId = fleetJson.userId;
    var managedBy = Meteor.userId();
    var adminNotes = template.find('#adminNotes').value;
    var points = Number(template.find('select[id=rewardAmount]').value);
    var date = new Date(); // current date

    // update fleet
    Fleets.update({'_id': fleet._id}, {$set: {
      'status': 'Approved',
      'points': points,
      'managed_by': managedBy,
      'admin_notes': adminNotes,
      'modified': date
    }}, {multi: true});

    //update users points
    Meteor.users.update({'_id': userId}, {
      '$set': {
        'profile.modified': date
      },
      '$inc': {
        'profile.points': points
      }
    }, {multi: true});

    // reset view
    $('#adminViewPendingFleet').hide();
    $('#pendingAdminFleets').show();
    // reset values
    $('#adminNotes').val('');
    $('#rewardAmount option').eq(0).prop('selected', true);
    delete Session.keys['fleet'];
  },
  'click #deny': function (event, template) {
    // get values
    var fleetJson = Session.get('fleet');
    fleet = Fleets.findOne({'_id': fleetJson.fleetId});
    var managedBy = Meteor.userId();
    var adminNotes =  $('#adminNotes').val();
    var date = new Date(); // current date

    // update
    Fleets.update({'_id': fleet._id}, {$set: {
      'status': 'Denied',
      'points': 0,
      'managed_by': managedBy,
      'admin_notes': adminNotes,
      'modified': date
    }}, {multi: true});

    // reset view
    $('#adminViewPendingFleet').hide();
    $('#pendingAdminFleets').show();
    // reset values
    $('#adminNotes').val('');
    $('#rewardAmount option').eq(0).prop('selected', true);
    delete Session.keys['fleet'];
  },
  'submit form': function (event, template) {
    //event.preventDefault();
    return false;
  }
});

/* adminFleets.js */

Template.adminFleetDatatable.onRendered(function () {
  this.$('#datatable').dataTable({
    "order":[[0,'desc']]
  });
});

Template.adminFleetDatatable.helpers({
  fleets: function () {
    var fleets = Fleets.find({}, {sort: {modified: -1}}).fetch();
    for (var i = 0; i < fleets.length; i++) {
      var user = Meteor.users.findOne(fleets[i].user_id);
      fleets[i].user_name = user && user.profile && user.profile.name;
      var admin = Meteor.users.findOne(fleets[i].reviewed_by);
      fleets[i].admin_name = admin && admin.profile && admin.profile.name;
    }
    return fleets;
  }
});

Template.adminFleetDatatable.events({
  "click .btn": function (event, template) {
    // get admin user name from id
    var admin = Meteor.users.findOne({'_id': this.reviewed_by});
    // view fleet details
    // formatDate
    var date = moment(this.modified).format('MM-DD-YYYY');
    $('#titleText').html('Viewing ' + this.fleet_name + ' from ' + date);
    $('#fleetName').val(this.fleet_name);
    $('#papLink').val(this.pap_link);
    $('#ping').val(this.ping);
    $('#additionalInformation').val(this.additional_information);
    $('#adminNotes').val(this.admin_notes);
    $('#reviewedBy').val(admin.profile.name);
  }
});

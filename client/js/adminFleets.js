/* adminFleets.js */

Template.adminFleetDatatable.onRendered(function () {
  this.$('#datatable').dataTable({
    "order":[[0,'desc']]
  });
});

Template.adminFleetDatatable.helpers({
  fleets: function () {
    return Fleets.find({}, {sort: {modified: -1}}).fetch();
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

/* adminFleets.js */

Template.adminFleetDatatable.onRendered(function () {
  this.$('#datatable').dataTable();
});

Template.adminFleetDatatable.helpers({
  fleets: function () {
    return Fleets.find({}, {sort: {modified: -1}}).fetch();
  }
});

Template.adminFleetDatatable.events({
  "click .btn": function (event, template) {
    // view fleet details in userFleetViewer
    // formatDate
    var date = moment(this.modified).format('MM-DD-YYYY');
    $('#titleText').html('Viewing ' + this.fleet_name + ' from ' + date);
    $('#fleetName').val(this.fleet_name);
    $('#papLink').val(this.pap_link);
    $('#ping').val(this.ping);
    $('#additionalInformation').val(this.additional_information);
    $('#adminNotes').val(this.admin_notes);
    $('#reviewedBy').val(this.reviewed_by);
  }
});

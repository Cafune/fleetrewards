/* userFleetHistory.js */

Template.userFleetDatatable.onRendered(function () {
  this.$('#datatable').dataTable();
});

Template.userFleetDatatable.helpers({
  fleets: function () {
    return Fleets.find({user_id: Meteor.userId(), status: {$ne: 'Pending'}}, {sort: {modified: -1}}).fetch();
  }
});

Template.userFleetDatatable.events({
  "click .btn": function (event, template) {
    // view fleet details in userFleetViewer
    // formatDate
    var date = moment(this.modified).format('MM-DD-YYYY');
    $('#titleText').html('Viewing ' + this.fleet_name + ' from ' + date);
    $('#fleetName').val(this.fleet_name);
    $('#papLink').val(this.pap_link);
    $('#ping').val(this.ping);
    $('#additionalInformation').val(this.additional_information);
  }
});

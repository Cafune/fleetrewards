// main.js

Template.body.onCreated(function () {
  $.material.init();
})
Template.body.onRendered(function () {
  // request eve IGB trust
  /*if (typeof CCPEVE !== 'undefined') {
    CCPEVE.requestTrust('http://site');
  }*/
});


// format Dates
Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM-DD-YYYY');
});

// trim string length if it's longer than 14 characters
Template.registerHelper('trimString', function(string) {
  // check if string is defined
  if (typeof string !== 'undefined' && string.length > 14) {
    var newString = string.substring(0,11);
    return newString + '...';
  }
  return string;
});

// iff checker
Template.registerHelper('eq', function(v1, v2, options) {
  if (v1 == v2) {
    return true;
  } else {
    return false;
  }
});

Template.userNav.events({
  'click #profile': function (event, template) {
    Router.go('profile');
  },
  'click #logout': function (event, template) {
    Meteor.logout();
  }
});

Template.userNav.helpers({
  pendingCounter: function () {
    var fleetPendingCount = Fleets.find({status: 'Pending'}).count();
    var payoutPendingCount = Payouts.find({status: 'Pending'}).count();
    var pendingCount = fleetPendingCount + payoutPendingCount;
    if (pendingCount < 1) {
      return false;
    }
    return pendingCount;
  }
});

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

// main.js

// format Dates
Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM-DD-YYYY');
});

// iff checker
Template.registerHelper('eq', function(v1, v2, options) {
  if (v1 == v2) {
    return true;
  } else {
    return false;
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

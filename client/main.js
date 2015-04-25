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

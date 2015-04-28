// router.js

// force login page if not logged in
// might be buggy =/

/*
Router.onBeforeAction(function() {
  if (!Meteor.userId()) {
    this.render('login');
  } else {
    this.next();
  }
});
*/

//if (!Meteor.loggingIn()) Router.go('login');

Router.map( function () {
  this.route('home', {path: '/'} );
  this.route('pending', {path: '/admin/pending'} );
  this.route('rewards', {path: '/admin/rewards'} );
  this.route('usercp', {path: '/admin/usercp'} );
  this.route('fleethistory', {path: '/admin/fleethistory'} );
  this.route('payouthistory', {path: '/admin/payouthistory'} );
});

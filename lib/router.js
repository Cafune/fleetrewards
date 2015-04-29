// router.js

// force login page if not logged in
// might be buggy =/

Router.onBeforeAction(function() {
  if (!Meteor.userId()) {
    this.render('login');
  } else {
    this.next();
  }
});

//if (!Meteor.loggingIn()) Router.go('login');

Router.map( function () {
  this.route('home', {path: '/'} );
  this.route('fleetHistory', {path: '/fleets'} );
  this.route('payoutHistory', {path: '/payouts'} );
  this.route('adminPending', {path: '/admin'} );
  this.route('adminRewards', {path: '/admin/rewards'} );
  this.route('adminUsers', {path: '/admin/users'} );
  this.route('adminFleets', {path: '/admin/fleets'} );
  this.route('adminPayouts', {path: '/admin/payouts'} );
});

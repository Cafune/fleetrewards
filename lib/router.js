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
  this.route('pending', {path: '/admin/pending'} );
  this.route('rewardCP', {path: '/admin/rewardCP'} );
  this.route('users', {path: '/admin/users'} );
  this.route('fleethistory', {path: '/admin/fleethistory'} );
  this.route('payouthistory', {path: '/admin/payouthistory'} );
});

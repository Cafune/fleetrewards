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
  this.route('userHome', {path: '/'} );
  this.route('userFleetHistory', {path: '/fleets'} );
  this.route('userPayoutHistory', {path: '/payouts'} );
  this.route('adminPending', {path: '/admin'} );
  /*this.route('/admin/pending/fleets/:_id', function () {
    var fleet = Fleets.findOne({_id: this.params._id});
    this.render('adminViewPendingFleet', {data: fleet});
  });*/
  this.route('adminRewards', {path: '/admin/rewards'} );
  this.route('adminUsers', {path: '/admin/users'} );
  this.route('adminFleets', {path: '/admin/fleets'} );
  this.route('adminPayouts', {path: '/admin/payouts'} );
});

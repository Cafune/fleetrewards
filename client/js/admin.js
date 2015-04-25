// admin.js

Template.adminFleets.helpers({
  fleets: function () {
    //return Fleets.find({ status: { $eq: "pending" } });
    return Fleets.find({});
  }
});

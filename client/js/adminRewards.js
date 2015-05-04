Template.adminRewards.onRendered(function () {
  $('[data-toggle="tooltip"]').tooltip() //initialize all tooltips in this template
});

Template.rewardGroup.events({
  'click .fa-pencil' : function(event, template) {
    $('#typeEdit').show();
    $('#typeName').hide();
  },
  'click #changeName' : function(event, template) {
    $('#typeEdit').hide();
    $('#typeName').show();
  }
})

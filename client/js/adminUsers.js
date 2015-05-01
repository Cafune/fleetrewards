Template.adminUserDatatable.onRendered(function () {
  this.$('#datatable').dataTable({
    "order":[[0,'desc']]
  });
});

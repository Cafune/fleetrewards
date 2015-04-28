/* adminShared.js */

Template.dirtcampWallet.helpers({
  dirtcamp_isk: function () {
    var dng =  Corporations.findOne({corp_ticker: 'D-N-G'});
    var balance = dng && dng.wallet && dng.wallet.balance
    return numeral(balance).format('0,0.00');
  }
});

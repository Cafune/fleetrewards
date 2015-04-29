// server.js

Meteor.startup(function () {
  // code to run on server at startup
  var corps = Corporations.find({}).fetch();
  if (corps.length < 1) {
    var accountID = '58106738';
    var keyID = '4331977';
    var vCode = 'sWaCfhnYPEilkeLgdyvCGpVkzTk8l422Gml6zKGRIw9CGdiJD4ABclCuJ33180mU';
    var url =  'https://api.eveonline.com/corp/AccountBalance.xml.aspx?keyID=' + keyID + '&vCode=' + vCode;
    var xml = HTTP.call('GET', url);
    var json = XML2JS.parse(xml.content);
    var balance = 0;
    for (var i = 0; i < json['eveapi']['result'][0]['rowset'][0]['row'].length; i++) {
      if (json['eveapi']['result'][0]['rowset'][0]['row'][i]['$'].accountID == accountID) {
        balance = Number(json['eveapi']['result'][0]['rowset'][0]['row'][i]['$'].balance);
      }
    }
    var date = new Date();
    var dng = {
      corp_name: 'Dirt \'n\' Glitter',
      corp_ticker: 'D-N-G',
      point_value: 10000000,
      wallet: {
        balance: balance
      },
      created: date,
      modified: date
    }
    Corporations.insert(dng);
  }

});

// cron
SyncedCron.add({
  name: 'Update Wallet Balance',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 31 mins');
  },
  job: function() {
    var accountID = '58106738';
    var keyID = '4331977';
    var vCode = 'sWaCfhnYPEilkeLgdyvCGpVkzTk8l422Gml6zKGRIw9CGdiJD4ABclCuJ33180mU';
    var url =  'https://api.eveonline.com/corp/AccountBalance.xml.aspx?keyID=' + keyID + '&vCode=' + vCode;
    var xml = HTTP.call('GET', url);
    var json = XML2JS.parse(xml.content);
    var balance = 0;
    for (var i = 0; i < json['eveapi']['result'][0]['rowset'][0]['row'].length; i++) {
      if (json['eveapi']['result'][0]['rowset'][0]['row'][i]['$'].accountID == accountID) {
        balance = Number(json['eveapi']['result'][0]['rowset'][0]['row'][i]['$'].balance);
      }
    }
    var date = new Date();
    Corporations.update({corp_ticker: 'D-N-G'}, {$set: {'wallet.balance': balance, 'modified': date}}, {multi: true});
  }
});

// start cron
SyncedCron.start();

// Validate corp is correct, in this case DNG, 98224639
// https://api.eveonline.com/eve/CharacterAffiliation.xml.aspx?ids=
Accounts.validateNewUser(function (user) {

  var dngCorpId = '98224639';
  var characterId = user['services']['eve']['character'].id;
  var url =  'https://api.eveonline.com/eve/CharacterAffiliation.xml.aspx?ids=';
  var fullUrl = url + characterId;
  var xml = HTTP.call('GET', fullUrl);
  var json = XML2JS.parse(xml.content);
  var characterCorpId = json['eveapi']['result'][0]['rowset'][0]['row'][0]['$'].corporationID;

  // check if they are in dng
  if (dngCorpId != characterCorpId) {
    // they're not in dng
    throw new Meteor.Error(403, 'You must be in Dirt \'n\' Glitter');
    return false
  }

  // add profile fields
  var date = new Date();
  user['profile'].group = 'user';
  user['profile'].corp_id = characterCorpId;
  user['profile'].points = 0;
  user['profile'].created = date;
  user['profile'].modified = date;
  return true;

});

Meteor.methods({
  /*getWallet: function () {
    var accountID = '58106738';
    var keyID = '4331977';
    var vCode = 'sWaCfhnYPEilkeLgdyvCGpVkzTk8l422Gml6zKGRIw9CGdiJD4ABclCuJ33180mU';
    var url =  'https://api.eveonline.com/corp/AccountBalance.xml.aspx?keyID=' + keyID + '&vCode=' + vCode;
    var xml = HTTP.call('GET', url);
    var json = XML2JS.parse(xml.content);
    var wallet = 0;
    for (var i = 0; i < json['eveapi']['result'][0]['rowset'][0]['row'].length; i++) {
      if (json['eveapi']['result'][0]['rowset'][0]['row'][i]['$'].accountID == accountID) {
        wallet = json['eveapi']['result'][0]['rowset'][0]['row'][i]['$'].balance;
      }
    }
    console.log(wallet);
  }*/
});

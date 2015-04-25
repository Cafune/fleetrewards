// server.js

Meteor.startup(function () {
  // code to run on server at startup
});


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

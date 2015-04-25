// server.js

Meteor.startup(function () {
  // code to run on server at startup
});


// Validate corp is correct, in this case DNG, 98224639
Accounts.validateNewUser(function (user) {
  // https://api.eveonline.com/eve/CharacterAffiliation.xml.aspx?ids=
  // Get corp id
  var dngCorpId = '98224639';
  var characterId = user['services']['eve']['character'].id;
  var url =  'https://api.eveonline.com/eve/CharacterAffiliation.xml.aspx?ids=';
  var fullUrl = url + characterId;
  var xml = HTTP.call('GET', fullUrl);
  var json = XML2JS.parse(xml.content);
  var characterCorpId = json['eveapi']['result'][0]['rowset'][0]['row'][0]['$'].corporationID;
  console.log(characterId);
  console.log(characterCorpId);
  if (dngCorpId == characterCorpId) {
    console.log('same corps');
  }
  else {
    console.log('different corps');
  }
  return false;
  /*if (user.username && user.username.length >= 3)
    return true;
  throw new Meteor.Error(403, "Username must have at least 3 characters");*/
});

/*Accounts.onCreateUser(function(options, user) {
    //pass the surname in the options

    user.profile['group'] = 'user';

    return user;
}

var options = {
    username: $('input#username')[0].value,
    emails: [{
        address: $('input#email')[0].value,
        verified: false
    }],
    password: $('input#password')[0].value,
    profile: {
        surname: $('input#surname')
    },
};
Accounts.createUser( options , function(err){
    if( err ) $('div#errors').html( err.message );
});
*/

<google-client-loader id="driveApi" name="drive" version="v2" on-google-api-loadx="driveApiLoaded"></google-client-loader>


var pickerObject = {

  // Google


  google_api_load_error: function(argument) {
    console.error(e);
  },

  _computePicker: function(user) {
    // observer: _computePicker(user)
    if (!user) return;
    // console.log(user);
    // user.accessToken
    setupPicker(this._pickerCallback, developerKey, user.accessToken);
  },

  _pickerCallback: function(data) {

    var url = 'nothing';
    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
      var docs = data[google.picker.Response.DOCUMENTS];
      // console.dir(data.docs);
      for (var i = 0; i < docs.length; i++) {
        this._getDriveFile(data.docs[i]);
        // data.docs[i].id
        // console.log('docs[i].id: ', docs[i]);
        // thiss.$.ajax.url = "https://www.googleapis.com/drive/v2/files/" + docs[i].id + "?key=AIzaSyAkeEajTtdn1qGL-UKCEq5uJNiRziLY3X4";
        // thiss.$.ajax.url = "http://localhost:8080/addPickerImages/?ac=" + thiss.user.accessToken;
        // thiss.$.ajax.body = docs;
        // thiss.$.ajax.generateRequest();
        // console.dir(thiss.$.ajax);
      }
    }
  },


  // Drive

  _getDriveFile: function(file) {
    // console.log(file.id);

    // console.dir(this.$.driveApi);
    var request = this.$.driveApi.api.files.get({
      'fileId': file.id,
      access_token: this.user.accessToken
        // 'api': developerKey
    });

    request.execute(function(resp) {
      // console.log(resp);
      this.$.catalogProduct.addImage(resp);
    }.bind(this));

  }

};


var picker, pickerReady, thiss;

function onApiLoad() {
  // console.log('apiload');
  gapi.load('picker', {
    'callback': function(argument) {
      pickerReady = true;
    }
  });
}

function setupPicker(cb, developerKey, accessToken) {
  if (!pickerReady) return;
  var supportedMimeType = "image/png,image/jpeg,image/jpg";

  var view1 = new google.picker.DocsView();
  view1.setMimeTypes(supportedMimeType);
  view1.setLabel("Image Files");

  var view3 = new google.picker.View(google.picker.ViewId.PHOTOS);
  view3.setLabel("Photos");

  var view2 = new google.picker.View(google.picker.ViewId.RECENTLY_PICKED);
  view2.setLabel("Recently Selected");

  picker = new google.picker.PickerBuilder().
  addView(view1).
  addView(view3).
  addView(view2).
    // enableFeature(google.picker.Feature.NAV_HIDDEN).
  enableFeature(google.picker.Feature.MULTISELECT_ENABLED).
  setOAuthToken(accessToken).
  setDeveloperKey(developerKey).
  setCallback(cb).
  build();

}
// Google Drive API Const
// var developerKey = 'AIzaSyAkeEajTtdn1qGL-UKCEq5uJNiRziLY3X4';
var developerKey = 'AIzaSyB2x_CG22tc1yosAWKz5hOfx6g6CF8d0Gw';

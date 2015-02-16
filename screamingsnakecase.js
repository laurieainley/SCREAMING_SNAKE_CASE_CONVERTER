if (Meteor.isClient) {

  Template.unsnaked.events({
    'keydown #unsnakedInput': function (e) {
      console.log(e);
      $("#TOM_PHOTO").addClass("mouthClose");
    },
    'keyup #unsnakedInput': function (e) {
      updateSnaked(e.target.value);
    }
  });

  Template.SNAKED.events({
    'click #SCREAMING_SNAKED_OUTPUT': function (e) {
      e.target.select();
    }
  });

  Template.link.events({
    'click #snakedLink': function (e) {
      e.target.select();
    }
  });

  Template.SNAKED.rendered = function(){
    if (!this.rendered){
      updateSnaked($("#unsnakedInput").val());
      this.rendered = true;
    }
  };

}

function updateSnaked(newText) {
  var conversion = newText.toUpperCase().replace(/ /g, "_");
  document.getElementById("SCREAMING_SNAKED_OUTPUT").innerHTML = conversion;

  createSnakedLink(newText);

  $("#TOM_PHOTO").removeClass("mouthClose");

}

function createSnakedLink(newText) {
  if(newText) {
    if (!location.origin)
      location.origin = location.protocol + "//" + location.host;

    var linkUrl = location.origin + "/saved/" + btoa(encodeURIComponent(newText));

    $("#snakedLink").val(linkUrl);
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

  });
}

Router.route('/', function () {
  this.render('Home');
});

Router.route('/saved/:pretext', function () {
  this.render('Home', {
    data: function (){
      var preText = decodeURIComponent(atob(this.params.pretext)); 
      return { preText: preText };
    }
  });
});

Router.onAfterAction(function() {
  document.title = 'SCREAMING_SNAKE_CASE_AS_A_SERVICE_(SSCAAS)';
});

Router.configure({
    trackPageView: true
});
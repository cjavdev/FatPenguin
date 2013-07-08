window.FatPenguin = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		new FatPenguin.Routers.Users({
			$rootEl: $("#content")
		});
		
		Backbone.history.start();
  }
};

$(document).ready(function(){
  FatPenguin.initialize();
});

window.FatPenguin = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		FatPenguin.users = new FatPenguin.Collections.Users();
		
		FatPenguin.users.fetch().then(function(){
			new FatPenguin.Routers.Users({
				$rootEl: $("#users-list")
			});
		
			//if logged in
			if(FatPenguin.current_user_id) {
				var userEditView = new FatPenguin.Views.UserForm({
					model: FatPenguin.users.get(FatPenguin.current_user_id)
				});
				
				FatPenguin.users.get(FatPenguin.current_user_id).track();
				FatPenguin.users.get(FatPenguin.current_user_id).join_chat();
				
				$("body").append(userEditView.render().$el)
			}
		
			Backbone.history.start();
		});
  },
	
	note: function (type, message) {
		$("#notifications").append(JST['note']({
			message: message,
			type: type
		}));
		$("#note-" + type).addClass("fade in");
		$(".modal-backdrop").remove();
	}
};

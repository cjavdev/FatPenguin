FatPenguin.Views.Message = Backbone.View.extend({
	events: {
		"click #btnSend" : "send"
	},

  template: JST['messages/form'],
	
	render: function () {
		var renderedContent = this.template({
			user: this.model
		});
		
		this.$el.html(renderedContent);
		return this;
	},
	
	send: function () {
		var msg = $("#message").val();
		$.post("/message/"+this.model.get("id"), {
			message: msg,
			from_id: FatPenguin.current_user_id
		});
		
		//FatPenguin.users.get(FatPenguin.current_user_id).direct_message(this.model, msg);
		this.$el.find("#msgModal").modal("hide");
	},
});

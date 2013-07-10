FatPenguin.Views.ReplyMessage = Backbone.View.extend({
	initialize: function (options) {
		this.message = options.message;
	},
	
	events: {
		"click #btnSend" : "send"
	},

  template: JST['messages/reply'],
	
	render: function () {
		var renderedContent = this.template({
			user: this.model,
			message: this.message
		});
		
		this.$el.html(renderedContent);
		return this;
	},
	
	send: function () {
		var message = $("#message").val();
		var to_id = this.model.get("id")
		$.post("/message/" + to_id, {
			message: message,
			from_id: FatPenguin.current_user_id
		});
		
		this.$el.find("#rmsgModal").modal("hide");
	},
});

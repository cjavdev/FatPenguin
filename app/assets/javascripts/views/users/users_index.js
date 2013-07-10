FatPenguin.Views.UsersIndex = Backbone.View.extend({
	events: {
		"click #btnSayHi" : "sayhi"
	},
	
	initialize: function (options) {
		this.listenTo(this.collection, "all", this.render);
	},

  template: JST['users/index'],
	
	render: function () {
		var renderedContent = this.template({
			users: this.collection
		});
		
		this.$el.html(renderedContent);
		return this;
	},
	
	sayhi: function (event) {
		event.preventDefault();
		var peerjs_id = $(event.target).attr("data-id");
		
		FatPenguin.users.get(FatPenguin.current_user_id).direct_message(peerjs_id, "hi");
		
	},
});

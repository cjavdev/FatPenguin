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
		
		var id = $(event.target).attr("data-id");
		
		var user = FatPenguin.users.get(id);
		
		var msgView = new FatPenguin.Views.Message({
			model: user
		});
		
		this.$el.find("#message-box").html(msgView.render().$el);
		this.$el.find("#msgModal").modal("show");		
	},
});

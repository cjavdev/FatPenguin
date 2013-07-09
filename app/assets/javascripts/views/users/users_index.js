FatPenguin.Views.UsersIndex = Backbone.View.extend({
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
	}
});
